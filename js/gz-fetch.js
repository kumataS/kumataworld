/* =========================================================
   gz-fetch.js — 圧縮(gzip)した Unity ビルドを ブラウザで もどす
   GitHub Pages は .gz に「圧縮してあるよ」の しるし(Content-Encoding)を 付けないので、
   ここで fetch を ラップして、.gz の ファイルを 自分で 展開する。
   つかいかた:ゲームの index.html で loader.js より 前に
     <script src="../../../js/gz-fetch.js"></script>
   を 入れて、dataUrl / codeUrl を ".gz" つきに する。
   ========================================================= */
(function () {
  if (window.__kumataGz) return;
  window.__kumataGz = true;
  var origFetch = window.fetch.bind(window);
  var fflateReady = null;

  function typeOf(url) {
    if (/\.wasm\.gz$/.test(url)) return "application/wasm";
    if (/\.js\.gz$/.test(url)) return "application/javascript";
    return "application/octet-stream";
  }

  // ブラウザの DecompressionStream が ない(古い iPhone など)ときだけ fflate を よむ
  function loadFflate() {
    if (!fflateReady) {
      fflateReady = new Promise(function (ok, ng) {
        var s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js";
        s.onload = function () { ok(window.fflate); };
        s.onerror = ng;
        document.head.appendChild(s);
      });
    }
    return fflateReady;
  }

  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    if (!/\.gz(\?|$)/.test(url)) return origFetch(input, init);
    return origFetch(input, init).then(function (res) {
      if (!res.ok) return res;
      var headers = { "Content-Type": typeOf(url.split("?")[0]) };
      if (typeof DecompressionStream === "function") {
        return new Response(res.body.pipeThrough(new DecompressionStream("gzip")), { status: 200, headers: headers });
      }
      return Promise.all([res.arrayBuffer(), loadFflate()]).then(function (r) {
        var out = r[1].gunzipSync(new Uint8Array(r[0]));
        return new Response(out, { status: 200, headers: headers });
      });
    });
  };
})();
