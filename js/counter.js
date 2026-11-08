// カウンター:Firebase Realtime Database の REST API で 数を 数える(SDK なし)
//
// データの かたち(Firebase の中):
//   counts/visits            … サイトの 訪問回数
//   counts/plays/<ゲームid>     … ブラウザで あそばれた 回数
//   counts/downloads/<ゲームid> … Android(APK)の ダウンロード回数
//
// 書きこみは サーバーで +1 する(".sv": {"increment": 1})。
// Firebase の ルールで「+1 しか ゆるさない」ように している(firebase-rules.json)。
(function () {
  const cfg = window.KUMATA_COUNTER_CONFIG || {};
  const base = String(cfg.databaseURL || "").replace(/\/+$/, "");
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const mode = base ? "firebase" : isLocal ? "test" : "off";
  const TIMEOUT_MS = 6000;
  const MOCK_KEY = "kumata-test-counts";

  function keyPath(kind, id) {
    return id == null ? kind : `${kind}/${encodeURIComponent(id)}`;
  }

  async function fetchJson(url, opts) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const r = await fetch(url, { ...opts, signal: ctrl.signal });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } finally {
      clearTimeout(t);
    }
  }

  // ---------- テストモード(localhost で 設定が 空のとき) ----------
  function mockLoad() {
    try { return JSON.parse(localStorage.getItem(MOCK_KEY)) || {}; } catch (e) { return {}; }
  }
  function mockSave(data) {
    try { localStorage.setItem(MOCK_KEY, JSON.stringify(data)); } catch (e) { /* 保存できなくても OK */ }
  }

  let cache = null;

  // ぜんぶの 数を まとめて 1回だけ 読む
  function getAll() {
    if (cache) return cache;
    if (mode === "off") cache = Promise.resolve(null);
    else if (mode === "test") cache = Promise.resolve(mockLoad());
    else cache = fetchJson(`${base}/counts.json`).then(d => d || {}).catch(err => {
      console.warn("[counter] よみこみ しっぱい", err);
      return null;
    });
    return cache;
  }

  // +1 して あたらしい 数を かえす(しっぱいしたら null)
  async function hit(kind, id) {
    if (mode === "off") return null;
    if (mode === "test") {
      const data = mockLoad();
      let n;
      if (id == null) n = data[kind] = (data[kind] || 0) + 1;
      else {
        data[kind] = data[kind] || {};
        n = data[kind][id] = (data[kind][id] || 0) + 1;
      }
      mockSave(data);
      cache = Promise.resolve(data);
      return n;
    }
    try {
      const n = await fetchJson(`${base}/counts/${keyPath(kind, id)}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ".sv": { increment: 1 } }),
      });
      return typeof n === "number" ? n : null;
    } catch (err) {
      console.warn("[counter] かきこみ しっぱい", err);
      return null;
    }
  }

  // 1つの 数を 読む
  async function get(kind, id) {
    const all = await getAll();
    if (!all) return null;
    const v = id == null ? all[kind] : (all[kind] || {})[id];
    return typeof v === "number" ? v : 0;
  }

  // 訪問は ブラウザを とじるまで 1回だけ 数える
  async function visit() {
    let first = true;
    try {
      first = !sessionStorage.getItem("kumata-visited");
      sessionStorage.setItem("kumata-visited", "1");
    } catch (e) { /* sessionStorage が つかえなくても 数える */ }
    return first ? hit("visits") : get("visits");
  }

  function fmt(n) {
    return Number(n || 0).toLocaleString("ja-JP");
  }

  window.KumataCounter = {
    mode,
    enabled: mode !== "off",
    getAll, get, hit, visit, fmt,
    play: id => hit("plays", id),
    download: id => hit("downloads", id),
  };

  if (mode === "test") console.info("[counter] テストモード:この ブラウザの中だけで 数えています(counter-config.js が 空)");
})();
