// ゲーム画面:play.html?id=xxx の ゲームを 画面いっぱいで すぐ はじめる
(function () {
  const game = gameFromUrl();
  const stage = document.getElementById("p-stage");
  const webgl = game && webglUrl(game);

  if (!game || !webgl) {
    stage.innerHTML = `<div class="empty" style="margin:20px">${game
      ? `「${esc(game.title)}」の ブラウザばんは じゅんびちゅう…🐻<br><a class="btn" style="margin-top:12px" href="game.html?id=${encodeURIComponent(game.id)}">せつめいページへ</a>`
      : "ゲームが みつからなかったよ…🐻"}</div>`;
    return;
  }

  document.title = `${game.title} | kumataWorld!`;
  document.getElementById("p-title").textContent = game.title;
  document.getElementById("p-info").href = `game.html?id=${encodeURIComponent(game.id)}`;

  stage.innerHTML = `<iframe src="${esc(webgl)}" title="${esc(game.title)}" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>`;
  const frame = stage.querySelector("iframe");
  fitFrame(frame);
  frame.focus();

  document.getElementById("p-fs").addEventListener("click", () => {
    // iPhone は 要素の 全画面に 対応していないので、ゲームだけの ページを ひらく
    if (stage.requestFullscreen) stage.requestFullscreen();
    else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
    else location.href = webgl;
  });

  // あそばれた回数を +1
  if (window.KumataCounter) KumataCounter.play(game.id);
})();
