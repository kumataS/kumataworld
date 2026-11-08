// 詳細ページ:みんなの かんそう(ニックネーム・★・かんそう・日付)
(function () {
  const box = document.getElementById("reviews");
  const R = window.KumataReviews;
  const game = gameFromUrl();
  if (!box || !game) return;
  if (!R || !R.enabled) { box.remove(); return; }

  const NAME_KEY = "kumata-review-name";
  let savedName = "";
  try { savedName = localStorage.getItem(NAME_KEY) || ""; } catch (e) { /* OK */ }

  const stars = n => "★".repeat(n) + "☆".repeat(5 - n);

  box.innerHTML = `
    <h2>💬 みんなの かんそう <span class="rv-count" id="rv-count"></span></h2>
    <div class="rv-avg" id="rv-avg" hidden></div>

    <div class="rv-ask">
      <img src="assets/kumata.png" alt="">
      <p>この ゲームを もっと おもしろく するために、きみの かんそうを おしえてね!<br>
        「ここが むずかしい」「こんな ステージが ほしい」「バグを 見つけた」なども 大かんげい。
        みんなの こえで ゲームを アップデートしていくよ!</p>
    </div>

    <form class="rv-form" id="rv-form" novalidate>
      <label class="rv-label" for="rv-name">ニックネーム</label>
      <input id="rv-name" type="text" maxlength="${R.LIMITS.name}" autocomplete="nickname" placeholder="れい:くまのすけ" value="${esc(savedName)}">

      <span class="rv-label">ひょうか</span>
      <div class="rv-stars" id="rv-stars" role="radiogroup" aria-label="ひょうか">
        ${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${n}">☆</button>`).join("")}
        <span class="rv-stars-label" id="rv-stars-label">★を おして えらんでね</span>
      </div>

      <label class="rv-label" for="rv-text">かんそう</label>
      <textarea id="rv-text" rows="4" maxlength="${R.LIMITS.text}" placeholder="たのしかった ところ、むずかしかった ところ、こうしたら もっと よくなる! など"></textarea>
      <div class="rv-len"><span id="rv-len">0</span> / ${R.LIMITS.text}</div>

      <p class="rv-note">⚠️ 本名・学校名・住所・電話番号など、自分や 友だちの ことが わかる ことは 書かないでね。<br>
        書いた かんそうは だれでも 見られるよ。ふさわしくない 書きこみは 消すことが あります。</p>

      <button class="btn play" type="submit" id="rv-submit">✏️ かんそうを おくる</button>
      <div class="rv-msg" id="rv-msg" role="status"></div>
    </form>

    <ul class="rv-list" id="rv-list"><li class="rv-empty">よみこみちゅう…</li></ul>`;

  const $ = id => document.getElementById(id);
  const form = $("rv-form"), nameEl = $("rv-name"), textEl = $("rv-text"), msg = $("rv-msg");
  const starBtns = [...$("rv-stars").querySelectorAll("button")];
  let rating = 0;
  let reviews = [];

  function setRating(n) {
    rating = n;
    starBtns.forEach(b => {
      const on = +b.dataset.n <= n;
      b.textContent = on ? "★" : "☆";
      b.classList.toggle("on", on);
      b.setAttribute("aria-checked", String(+b.dataset.n === n));
    });
    $("rv-stars-label").textContent = n ? ["", "いまいち", "ふつう", "まあまあ", "たのしい!", "さいこう!"][n] : "★を おして えらんでね";
  }
  starBtns.forEach(b => b.addEventListener("click", () => setRating(+b.dataset.n)));

  textEl.addEventListener("input", () => { $("rv-len").textContent = textEl.value.length; });

  function render() {
    const list = $("rv-list");
    $("rv-count").textContent = `${reviews.length} けん`;
    const avg = $("rv-avg");
    if (reviews.length) {
      const a = reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length;
      avg.innerHTML = `<span class="rv-avg-stars">${stars(Math.round(a))}</span> <b>${a.toFixed(1)}</b> / 5`;
      avg.hidden = false;
    } else avg.hidden = true;

    list.innerHTML = reviews.length
      ? reviews.map(r => `
        <li class="rv-item">
          <div class="rv-head">
            <span class="rv-name">${esc(r.name)}</span>
            <span class="rv-item-stars" aria-label="★${r.rating}">${stars(r.rating || 0)}</span>
            <time class="rv-date">${R.fmtDate(r.ts)}</time>
          </div>
          <p class="rv-text">${esc(r.text)}</p>
        </li>`).join("")
      : `<li class="rv-empty">まだ かんそうは ないよ。さいしょの ひとりに なってね!</li>`;
  }

  R.list(game.id).then(list => {
    if (list == null) {
      $("rv-list").innerHTML = `<li class="rv-empty">かんそうを よみこめなかったよ…</li>`;
      return;
    }
    reviews = list;
    render();
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    msg.className = "rv-msg";
    msg.textContent = "";
    const input = { name: nameEl.value.trim(), text: textEl.value.trim(), rating };
    const err = R.check(input);
    if (err) { msg.className = "rv-msg err"; msg.textContent = err; return; }

    const btn = $("rv-submit");
    btn.disabled = true;
    try {
      const entry = await R.post(game.id, input);
      try { localStorage.setItem(NAME_KEY, input.name); } catch (e2) { /* OK */ }
      reviews.unshift(entry);
      render();
      textEl.value = "";
      $("rv-len").textContent = "0";
      setRating(0);
      msg.className = "rv-msg ok";
      msg.textContent = "ありがとう!かんそうを おくったよ 🐻";
    } catch (e2) {
      msg.className = "rv-msg err";
      msg.textContent = e2.message;
    } finally {
      btn.disabled = false;
    }
  });

  // 一覧の 💬 ボタンから きたとき
  if (location.hash === "#reviews") {
    requestAnimationFrame(() => box.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
})();
