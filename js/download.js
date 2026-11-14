// Android ばん ダウンロード画面:download.html?id=xxx
(function () {
  const game = gameFromUrl();
  const root = document.getElementById("dl");
  const back = `<a class="back" href="index.html#play">← ゲーム いちらんに もどる</a>`;

  if (!game || !(game.apk || game.googlePlay)) {
    root.innerHTML = `${back}
      <div class="empty" style="margin-top:20px">${game
        ? `「${esc(game.title)}」の Android ばんは じゅんびちゅう…🐻`
        : "ゲームが みつからなかったよ…🐻"}</div>`;
    return;
  }

  document.title = `${game.title} Android ばん ダウンロード | kumataWorld!`;
  const counter = window.KumataCounter;
  const detail = `game.html?id=${encodeURIComponent(game.id)}`;
  const fileName = game.apk ? decodeURIComponent(game.apk.split("/").pop()) : "";
  const gp = game.googlePlay;
  // Google Play の 公式バッジ(日本語)
  const gpBadge = `<a class="gp-badge" id="gp-btn" href="${esc(gp || "")}" target="_blank" rel="noopener">
      <img src="https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png"
           alt="Google Play で手に入れよう" width="240" height="93"></a>`;
  const apkBtn = game.apk
    ? `<a class="btn green ${gp ? "" : "big "}dl-btn" id="dl-btn" href="${esc(game.apk)}" download>⬇ APK を ダウンロード</a>
       <div class="dl-file">${esc(fileName)}</div>`
    : "";

  root.innerHTML = `
    ${back}
    <div class="panel dl-card">
      <div class="dl-icon" style="${thumbStyle(game)}">${thumbInner(game)}</div>
      <h1>${esc(game.title)}</h1>
      <p class="dl-sub">🤖 Android ばん ダウンロード</p>

      ${DEVICE.android ? "" : `<p class="dl-warn">いまの たんまつは ${esc(DEVICE.name)} だよ。<br>Android の スマホ・タブレットで この ページを ひらいてね。</p>`}

      ${gp ? `${gpBadge}
      <p class="dl-gp-note">Google Play から インストール できるよ!アップデートも 自動で とどくよ。</p>
      ${game.apk ? `<details class="dl-apk-alt"><summary>Google Play が つかえない ときは(APK を ちょくせつ ダウンロード)</summary>${apkBtn}</details>` : ""}`
      : apkBtn}
      ${counter && counter.enabled ? `<div class="dl-count">これまでの ダウンロード <b id="dl-count">-</b> かい</div>` : ""}
    </div>

    ${gp ? "" : `<div class="panel">
      <h2>📲 インストール ほうほう</h2>
      <ol class="dl-steps">
        <li>上の「APK を ダウンロード」を おす</li>
        <li>ダウンロードが おわったら、通知や「ファイル」アプリから ファイルを ひらく</li>
        <li>「この提供元のアプリを許可」と 出たら、オンに する</li>
        <li>「インストール」を おして かんりょう!ホーム画面の アイコンから あそべるよ</li>
      </ol>
    </div>`}

    <p class="dl-links">
      ${webglUrl(game) ? `<a class="btn play" href="play.html?id=${encodeURIComponent(game.id)}">🌐 ブラウザで あそぶ</a>` : ""}
      <a class="btn" href="${detail}">📝 ゲームの せつめい</a>
    </p>`;

  const countEl = document.getElementById("dl-count");
  const show = n => { if (countEl && n != null) countEl.textContent = counter.fmt(n); };

  if (counter && counter.enabled) counter.get("downloads", game.id).then(show);

  // APK でも Google Play でも、おされたら ダウンロード かいすうに 数える
  ["dl-btn", "gp-btn"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => { if (counter) counter.download(game.id).then(show); });
  });
})();
