// YouTube ショート動画を、ページの 上に かさねて 再生する(見おわったら 自動で とじて、見ていた 場所に もどる)
//
// つかいかた:<a href="https://youtube.com/shorts/ID" data-yt>…</a> を おくだけ。
//   - クリックすると この ページの 上で 再生する(YouTube の ページには 移動しない)
//   - 1回 見おわったら 自動で とじる → 次の 動画は 流れない
//   - × ボタン・まわりの 暗い ところ・Esc キーでも とじる
//   - 動画の 持ち主が「埋め込み」を 許可していない 動画は、
//     YouTube で ひらく ボタンを 出す(そのときだけ YouTube に 移動する)
(function () {
  "use strict";

  function videoId(url) {
    const m = String(url).match(/(?:shorts\/|youtu\.be\/|[?&]v=|embed\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : null;
  }

  // ---- YouTube IFrame API を 1回だけ 読みこむ ----
  let apiReady = null;
  function loadApi() {
    if (apiReady) return apiReady;
    apiReady = new Promise(resolve => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT); };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
    return apiReady;
  }

  // ---- 画面 ----
  let modal, box, player, lastFocus, scrollY = 0, watch = null;

  // ショート動画は 埋め込むと「おわり」の 合図を 出さずに くり返し 再生する ことがある。
  // 再生時間を 見はって、さいごまで 行ったら(または 先頭に もどったら)とじる
  function startWatch() {
    stopWatch();
    let last = 0, maxT = 0;
    watch = setInterval(() => {
      if (!player || !player.getCurrentTime) return;
      const t = player.getCurrentTime() || 0, d = player.getDuration() || 0;
      if (d > 0 && (t >= d - 0.25 || (maxT > d - 1.5 && t < last - 1))) { close(); return; }
      if (t > maxT) maxT = t;
      last = t;
    }, 200);
  }
  function stopWatch() { if (watch) { clearInterval(watch); watch = null; } }

  function build() {
    modal = document.createElement("div");
    modal.className = "yt-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "どうが");
    modal.innerHTML = `
      <div class="yt-modal-box">
        <button type="button" class="yt-modal-close" aria-label="とじる">×</button>
        <div class="yt-modal-frame"><div id="yt-modal-player"></div></div>
      </div>`;
    document.body.appendChild(modal);
    box = modal.querySelector(".yt-modal-frame");
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.closest(".yt-modal-close")) close();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });
  }

  function open(url) {
    const id = videoId(url);
    if (!id) { window.open(url, "_blank", "noopener"); return; }
    if (!modal) build();
    lastFocus = document.activeElement;
    scrollY = window.scrollY;
    box.innerHTML = `<div id="yt-modal-player"></div>`;
    modal.classList.add("open");
    document.documentElement.classList.add("yt-modal-lock");
    modal.querySelector(".yt-modal-close").focus();

    loadApi().then(YT => {
      if (!modal.classList.contains("open")) return;
      player = new YT.Player("yt-modal-player", {
        videoId: id,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1, fs: 0 },
        events: {
          onReady: e => { try { e.target.playVideo(); } catch (_) {} startWatch(); },
          // 見おわったら とじる(つぎの 動画は 流さない)
          onStateChange: e => { if (e.data === YT.PlayerState.ENDED) close(); },
          // 埋め込みが 許可されていない 動画など
          onError: () => showFallback(url),
        },
      });
    });
  }

  function showFallback(url) {
    stopWatch();
    if (player && player.destroy) { try { player.destroy(); } catch (_) {} }
    player = null;
    box.innerHTML = `
      <div class="yt-modal-fallback">
        <p>この どうがは ここでは 見られないよ…🐻</p>
        <a class="btn yt-modal-open" href="${url.replace(/"/g, "&quot;")}" target="_blank" rel="noopener">▶ YouTube で 見る</a>
        <p class="yt-modal-note">(YouTube が ひらきます。見おわったら この ページに もどってきてね)</p>
      </div>`;
    box.querySelector(".yt-modal-open").addEventListener("click", () => setTimeout(close, 300));
  }

  function close() {
    stopWatch();
    if (!modal || !modal.classList.contains("open")) return;
    if (player && player.destroy) { try { player.destroy(); } catch (_) {} }
    player = null;
    box.innerHTML = "";
    modal.classList.remove("open");
    document.documentElement.classList.remove("yt-modal-lock");
    window.scrollTo(0, scrollY);           // 見ていた 場所に もどす
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  // data-yt の リンクを おしたら、ページの 上で 再生
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-yt]");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    open(a.href);
  });

  window.KumataVideo = { open, close };
})();
