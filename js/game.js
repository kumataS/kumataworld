// 詳細ページ:game.html?id=xxx のゲームを表示する
(function () {
  const games = window.KUMATA_GAMES || [];
  const id = new URLSearchParams(location.search).get("id");
  const game = games.find(g => g.id === id);
  const $ = sel => document.getElementById(sel.replace("#", ""));

  if (!game) {
    $("#detail").innerHTML = `
      <a class="back" href="index.html">← ゲーム いちらんに もどる</a>
      <div class="empty" style="margin-top:20px">ゲームが みつからなかったよ…🐻</div>`;
    return;
  }

  const cat = CATEGORIES[game.category] || CATEGORIES.play;
  document.title = `${game.title} | kumataWorld!`;
  $("#g-title").textContent = game.title;
  const badge = $("#g-badge");
  badge.className = `badge ${game.category}`;
  badge.textContent = `${cat.icon} ${cat.label}`;

  // ---------- 説明 ----------
  $("#g-desc").innerHTML = (game.description || "せつめいは じゅんびちゅう…")
    .split("\n").map(line => `<p style="margin:0 0 8px">${esc(line)}</p>`).join("");

  // ---------- プレイ画面 ----------
  const stage = $("#stage");
  const cover = $("#stage-cover");
  const tools = $("#stage-tools");
  const webgl = webglUrl(game);
  stage.style.background = game.color || "#f3c48f";

  // アイコンが あれば アイコン、なければ 絵文字
  const coverIcon = `<div class="cover-icon"><span class="ph">${esc(game.emoji || "🎲")}</span>${iconImg(game)}</div>`;

  function startGame() {
    stage.innerHTML = `<iframe src="${esc(webgl)}" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>`;
    tools.innerHTML = `
      <button class="btn yellow" id="btn-fs">⛶ ぜんがめん</button>
      <a class="btn" href="${esc(webgl)}" target="_blank" rel="noopener">↗ べつのタブで ひらく</a>`;
    $("#btn-fs").addEventListener("click", () => {
      // iPhone は要素の全画面に対応していないので、べつタブで開く
      if (stage.requestFullscreen) stage.requestFullscreen();
      else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
      else window.open(webgl, "_blank");
    });
  }

  if (webgl) {
    cover.innerHTML = `
      <div>
        ${coverIcon}
        <button class="btn yellow big" id="btn-start">▶ ブラウザで あそぶ</button>
      </div>`;
    $("#btn-start").addEventListener("click", startGame);
  } else {
    cover.innerHTML = `
      <div>
        ${coverIcon}
        <div style="font-weight:800;font-size:1.2rem;text-shadow:2px 2px 0 rgba(0,0,0,.3)">
          ${game.apk ? "このゲームは Android アプリで あそべるよ!" : "ブラウザばんは じゅんびちゅう!"}
        </div>
      </div>`;
  }

  // ---------- あそぶ / ダウンロード ----------
  const get = $("#get-panel");
  let html = `<h2 style="justify-content:center">🚀 あそびかた</h2>
    <div class="device">いまの たんまつ:${DEVICE.name}</div>`;

  const playBtn = webgl
    ?`<button class="btn play big" data-start>▶ ブラウザで あそぶ</button>`
    : `<button class="btn big" disabled>ブラウザばん じゅんびちゅう</button>`;
  const apkBtn = game.apk
    ? `<a class="btn green big" href="${esc(game.apk)}" download>🤖 APK を ダウンロード</a>`
    : `<button class="btn big" disabled>Android ばん じゅんびちゅう</button>`;

  if (DEVICE.android) {
    html += apkBtn + playBtn;
  } else if (DEVICE.ios) {
    html += playBtn + `<p class="note">※ iPhone / iPad は ブラウザで あそべるよ。</p>`;
  } else {
    html += playBtn + (game.apk ? apkBtn.replace(" big", "") : "");
  }

  if (game.apk && !DEVICE.ios) {
    html += `
      <details class="apk-help" style="text-align:left;margin-top:6px">
        <summary>APK の インストール ほうほう</summary>
        <ol>
          <li>Android で「APK を ダウンロード」を おす</li>
          <li>ダウンロードした ファイルを ひらく</li>
          <li>「この提供元のアプリを許可」を オンにする</li>
          <li>「インストール」を おして かんりょう!</li>
        </ol>
      </details>`;
  }
  get.innerHTML = html;
  get.querySelectorAll("[data-start]").forEach(b => b.addEventListener("click", () => {
    startGame();
    stage.scrollIntoView({ behavior: "smooth", block: "center" });
  }));

  // ---------- スクリーンショット ----------
  const shots = game.screenshots || [];
  const main = $("#shots-main");
  const thumbs = $("#shots-thumbs");
  if (shots.length) {
    const show = i => {
      main.innerHTML = `<img src="${esc(shots[i])}" alt="スクリーンショット ${i + 1}">`;
      thumbs.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", i === j));
    };
    thumbs.innerHTML = shots.map((s, i) => `<button><img src="${esc(s)}" alt=""></button>`).join("");
    thumbs.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => show(i)));
    show(0);
  } else {
    main.style.background = game.color || "#f3c48f";
    main.innerHTML = `<span style="font-size:3rem">📷</span>`;
    thumbs.innerHTML = [1, 2, 3].map(() => `<button style="background:${game.color || "#f3c48f"}">📷</button>`).join("");
  }

  // ---------- 操作説明 ----------
  const controls = game.controls || {};
  const modes = [
    { key: "pc", label: "🖱️ PC" },
    { key: "touch", label: "👆 スマホ" },
  ].filter(m => (controls[m.key] || []).length);
  const sw = $("#controls-switch");
  const list = $("#controls-list");

  function showControls(key) {
    sw.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.key === key));
    list.innerHTML = (controls[key] || []).map(c =>
      `<li><span class="key">${esc(c.key)}</span><span>${esc(c.action)}</span></li>`).join("");
  }

  if (modes.length) {
    sw.innerHTML = modes.map(m => `<button data-key="${m.key}">${m.label}</button>`).join("");
    sw.querySelectorAll("button").forEach(b => b.addEventListener("click", () => showControls(b.dataset.key)));
    const first = (DEVICE.mobile && controls.touch?.length) ? "touch" : modes[0].key;
    showControls(first);
  } else {
    list.innerHTML = `<li>そうさ せつめいは じゅんびちゅう…</li>`;
  }

  // ---------- 情報 ----------
  const rows = [
    ["カテゴリ", `${cat.icon} ${cat.label}`],
    ["たいしょう", game.age || "だれでも"],
    ["プレイ人数", game.players || "1人"],
    ["あそべる たんまつ", [webgl && "ブラウザ(PC・iPhone)", game.apk && "Android"].filter(Boolean).join(" / ") || "じゅんびちゅう"],
    ["こうしん日", game.updated || "-"],
  ];
  $("#info-table").innerHTML = rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("");
})();
