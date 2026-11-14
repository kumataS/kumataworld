// トップページ:ゲーム一覧を作る
(function () {
  const games = window.KUMATA_GAMES || [];

  const counter = window.KumataCounter;

  function card(game) {
    const cat = CATEGORIES[game.category] || CATEGORIES.play;
    const detail = `game.html?id=${encodeURIComponent(game.id)}`;
    const webgl = webglUrl(game);
    // 「ブラウザ」→ ゲーム画面(play.html)/「Android」→ ダウンロード画面(download.html)
    const qid = encodeURIComponent(game.id);
    const pfs = [];
    if (webgl) pfs.push(`<a class="pf pf-link" href="play.html?id=${qid}" title="ブラウザで あそぶ">🌐 ブラウザ</a>`);
    if (game.apk) pfs.push(`<a class="pf pf-link" href="download.html?id=${qid}" title="Android ばんを ダウンロード">🤖 Android</a>`);
    // かんそうの 数(右はし)→ 詳細ページの かんそう欄へ
    const reviews = window.KumataReviews;
    if (reviews && reviews.enabled) pfs.push(`<a class="pf pf-link pf-review" href="${detail}#reviews" title="みんなの かんそう"><span aria-hidden="true">💬</span> <b data-review-count>-</b><span class="sr-only"> けんの かんそう</span></a>`);

    const stats = [];
    if (webgl) stats.push(`<span class="stat" data-stat="plays">▶ あそばれた <b>-</b> かい</span>`);
    if (game.apk) stats.push(`<span class="stat" data-stat="downloads">⬇ ダウンロード <b>-</b> かい</span>`);

    return `
      <article class="card" data-game-id="${esc(game.id)}">
        <div class="thumb" style="${thumbStyle(game)}">
          ${thumbInner(game)}
          <span class="badges"><span class="badge ${game.category}">${cat.icon} ${cat.label}</span>${game.subject ? `<span class="badge ${game.category}">${esc(game.subject)}</span>` : ""}</span>
          ${isReady(game) ? "" : `<span class="badge soon">じゅんびちゅう</span>`}
        </div>
        <div class="card-body">
          <h3><a class="card-link" href="${detail}">${esc(game.title)}</a></h3>
          <p>${esc(game.tagline)}</p>
          ${counter && counter.enabled && stats.length ? `<div class="stats">${stats.join("")}</div>` : ""}
          <div class="platforms">${pfs.join("")}</div>
        </div>
      </article>`;
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

  // ---------- 数を 表示 ----------
  if (counter && counter.enabled) {
    counter.getAll().then(all => {
      if (!all) return;
      document.querySelectorAll(".card[data-game-id]").forEach(el => {
        const id = el.dataset.gameId;
        el.querySelectorAll("[data-stat]").forEach(s => {
          const v = (all[s.dataset.stat] || {})[id];
          s.querySelector("b").textContent = counter.fmt(v);
        });
      });
    });

    // かんそうの 数
    if (window.KumataReviews && KumataReviews.enabled) {
      KumataReviews.counts(games.map(g => g.id)).then(c => {
        document.querySelectorAll(".card[data-game-id]").forEach(el => {
          const b = el.querySelector("[data-review-count]");
          if (b) b.textContent = c ? c[el.dataset.gameId] || 0 : "-";
        });
      });
    }

    const box = document.getElementById("visit-counter");
    counter.visit().then(n => {
      if (n == null || !box) return;
      box.querySelector("b").textContent = counter.fmt(n);
      box.hidden = false;
    });
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
