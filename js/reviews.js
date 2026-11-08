// かんそう(レビュー):Firebase Realtime Database の REST API で 読み書きする
//
// データの かたち:
//   reviews/<ゲームid>/<自動ID> = { name: ニックネーム, text: かんそう, rating: 1〜5, ts: 書きこみ時刻 }
//
// 書きこみは「あたらしく 足す」だけ。書きかえ・削除は できない(Firebase の ルールで きめている)。
// こまった 書きこみは Firebase コンソールの「データ」タブで 削除する。
(function () {
  const cfg = window.KUMATA_COUNTER_CONFIG || {};
  const base = String(cfg.databaseURL || "").replace(/\/+$/, "");
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const mode = base ? "firebase" : isLocal ? "test" : "off";
  const MOCK_KEY = "kumata-test-reviews";
  const LIMITS = { name: 20, text: 300 };
  const COOLDOWN_MS = 60 * 1000; // 同じ ゲームへの 連続書きこみは 1分 あける

  async function fetchJson(url, opts) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const r = await fetch(url, { ...opts, signal: ctrl.signal });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } finally {
      clearTimeout(t);
    }
  }
  const path = id => `${base}/reviews/${encodeURIComponent(id)}.json`;

  function mockLoad() {
    try { return JSON.parse(localStorage.getItem(MOCK_KEY)) || {}; } catch (e) { return {}; }
  }
  function mockSave(d) {
    try { localStorage.setItem(MOCK_KEY, JSON.stringify(d)); } catch (e) { /* OK */ }
  }

  // そのゲームの かんそう(あたらしい じゅん)
  async function list(id) {
    if (mode === "off") return null;
    let obj;
    if (mode === "test") obj = mockLoad()[id] || {};
    else {
      try { obj = (await fetchJson(path(id))) || {}; } catch (e) { console.warn("[reviews] よみこみ しっぱい", e); return null; }
    }
    return Object.entries(obj)
      .map(([key, v]) => ({ key, ...v }))
      .filter(r => r && typeof r.text === "string")
      .sort((a, b) => (b.ts || 0) - (a.ts || 0));
  }

  // ゲームごとの かんそうの 数 { id: 数 }
  async function counts(ids) {
    const out = {};
    ids.forEach(id => { out[id] = 0; });
    if (mode === "off") return null;
    if (mode === "test") {
      const all = mockLoad();
      ids.forEach(id => { out[id] = Object.keys(all[id] || {}).length; });
      return out;
    }
    try {
      // shallow=true で キーだけ もらう(中身は 読まないので かるい)
      const has = (await fetchJson(`${base}/reviews.json?shallow=true`)) || {};
      await Promise.all(ids.filter(id => has[id]).map(async id => {
        const keys = (await fetchJson(`${path(id)}?shallow=true`)) || {};
        out[id] = Object.keys(keys).length;
      }));
      return out;
    } catch (e) {
      console.warn("[reviews] 数の よみこみ しっぱい", e);
      return null;
    }
  }

  // ---------- 書きこみの チェック ----------
  const NG_WORDS = ["死ね", "しね", "シネ", "氏ね", "殺す", "ころす", "コロス", "消えろ", "きえろ", "キエロ"];
  function check({ name, text, rating }) {
    if (!name) return "ニックネームを 書いてね";
    if (!text) return "かんそうを 書いてね";
    if (!(rating >= 1 && rating <= 5)) return "★の 数を えらんでね";
    if (name.length > LIMITS.name) return `ニックネームは ${LIMITS.name}文字 までだよ`;
    if (text.length > LIMITS.text) return `かんそうは ${LIMITS.text}文字 までだよ`;
    const all = `${name} ${text}`;
    const plain = all.normalize("NFKC");
    if (NG_WORDS.some(w => plain.includes(w))) return "人が いやな 気もちに なる ことばは 書けないよ";
    if (/https?:|www\./i.test(plain)) return "URL(ホームページの アドレス)は 書けないよ";
    if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(plain)) return "メールアドレスは 書けないよ";
    if (/\d{2,4}[-‐ー−\s]?\d{2,4}[-‐ー−\s]?\d{3,4}/.test(plain) && plain.replace(/\D/g, "").length >= 10)
      return "電話番号は 書けないよ";
    return null;
  }

  function cooldownLeft(id) {
    try {
      const last = +localStorage.getItem(`kumata-review-last-${id}`) || 0;
      return Math.max(0, COOLDOWN_MS - (Date.now() - last));
    } catch (e) { return 0; }
  }

  // かんそうを 書きこむ → 書いた かんそうを かえす(しっぱいは エラー)
  async function post(id, input) {
    const entry = {
      name: String(input.name || "").trim(),
      text: String(input.text || "").trim(),
      rating: Math.round(Number(input.rating) || 0),
    };
    const err = check(entry);
    if (err) throw new Error(err);
    const wait = cooldownLeft(id);
    if (wait > 0) throw new Error(`つづけて 書くときは あと ${Math.ceil(wait / 1000)}びょう まってね`);
    if (mode === "off") throw new Error("いまは 書きこめないよ");

    let key;
    if (mode === "test") {
      const all = mockLoad();
      all[id] = all[id] || {};
      key = "t" + Date.now();
      all[id][key] = { ...entry, ts: Date.now() };
      mockSave(all);
    } else {
      try {
        const res = await fetchJson(path(id), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...entry, ts: { ".sv": "timestamp" } }),
        });
        key = res && res.name;
      } catch (e) {
        console.warn("[reviews] かきこみ しっぱい", e);
        throw new Error("書きこめなかったよ… すこし たってから もう一度 ためしてね");
      }
    }
    try { localStorage.setItem(`kumata-review-last-${id}`, String(Date.now())); } catch (e) { /* OK */ }
    return { key, ...entry, ts: Date.now() };
  }

  function fmtDate(ts) {
    const d = new Date(ts || 0);
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  window.KumataReviews = { mode, enabled: mode !== "off", LIMITS, list, counts, post, check, fmtDate };
})();
