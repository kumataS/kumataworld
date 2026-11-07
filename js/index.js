// トップページ:ゲーム一覧を作る
(function () {
  const games = window.KUMATA_GAMES || [];

  function card(game) {
    const cat = CATEGORIES[game.category] || CATEGORIES.play;
    const pfs = [];
    if (webglUrl(game)) pfs.push("🌐 ブラウザ");
    if (game.apk) pfs.push("🤖 Android");
    const thumb = thumbInner(game);

    return `
      <a class="card" href="game.html?id=${encodeURIComponent(game.id)}">
        <div class="thumb" style="${thumbStyle(game)}">
          ${thumb}
          <span class="badge ${game.category}">${cat.icon} ${cat.label}</span>
          ${isReady(game) ? "" : `<span class="badge soon">じゅんびちゅう</span>`}
        </div>
        <div class="card-body">
          <h3>${esc(game.title)}</h3>
          <p>${esc(game.tagline)}</p>
          <div class="platforms">
            ${pfs.map(p => `<span class="pf">${p}</span>`).join("")}
          </div>
        </div>
      </a>`;
  }

  for (const key of Object.keys(CATEGORIES)) {
    const list = games.filter(g => g.category === key);
    const grid = document.querySelector(`[data-grid="${key}"]`);
    const count = document.querySelector(`[data-count="${key}"]`);
    if (count) count.textContent = `${list.length} こ`;
    if (grid) {
      grid.innerHTML = list.length
        ? list.map(card).join("")
        : `<div class="empty">ゲームは もうすぐ とうじょう!</div>`;
    }
  }

  // タブで「ぜんぶ / まなぶ / あそぶ」を切りかえ
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.toggle("active", t === tab));
      const f = tab.dataset.filter;
      document.querySelectorAll(".section[data-cat]").forEach(sec => {
        sec.style.display = (f === "all" || sec.dataset.cat === f) ? "" : "none";
      });
    });
  });
})();
