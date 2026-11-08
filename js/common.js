// 共通の便利関数
const CATEGORIES = {
  edu:  { label: "まなぶ", icon: "📚" },
  play: { label: "あそぶ", icon: "🎮" },
};

// 端末の判定
const UA = navigator.userAgent;
const DEVICE = {
  android: /Android/i.test(UA),
  // iPadOS は Mac と名乗るのでタッチ対応で判定
  ios: /iPhone|iPad|iPod/i.test(UA) || (/Macintosh/i.test(UA) && navigator.maxTouchPoints > 1),
};
DEVICE.mobile = DEVICE.android || DEVICE.ios;
DEVICE.name = DEVICE.android ? "Android" : DEVICE.ios ? "iPhone / iPad" : "PC";

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---------- フォルダ名(id)から 自動で 場所を きめる ----------
// games/<id>/webgl/index.html      … WebGL ビルド
// games/<id>/<id>_Icon.png / .jpg  … アイコン(512×512)
// games.js に webgl / thumb を書けば そちらが 優先。webgl: "" なら「じゅんびちゅう」。
// フォルダ名に 日本語や ' ! が 入っていても だいじょうぶなように URL用に 変換
function gameDir(game) {
  return `games/${encodeURIComponent(game.id)}`;
}

function webglUrl(game) {
  return "webgl" in game ? game.webgl : `${gameDir(game)}/webgl/index.html`;
}

// icon: "ファイル名"  → そのフォルダの中の そのファイル
// icon: ""            → アイコンなし(仮サムネイル)
// icon を書かない     → <id>_Icon.png / .jpg を さがす
function iconCandidates(game) {
  if (game.thumb) return [game.thumb];
  if (game.icon === "") return [];
  if (game.icon) return [`${gameDir(game)}/${encodeURIComponent(game.icon)}`];
  const base = `${gameDir(game)}/${encodeURIComponent(game.id + "_Icon")}`;
  return [".png", ".jpg"].map(ext => base + ext);
}

// アイコンを順番に ためして、なければ 消す(下の 仮サムネイルが 見える)
function nextIcon(img) {
  const rest = (img.dataset.fallbacks || "").split("|").filter(Boolean);
  if (rest.length) {
    img.dataset.fallbacks = rest.slice(1).join("|");
    img.src = rest[0];
  } else {
    img.remove();
  }
}

function iconImg(game, cls = "icon") {
  const list = iconCandidates(game);
  if (!list.length) return "";
  const [first, ...rest] = list;
  return `<img class="${cls}" src="${esc(first)}" data-fallbacks="${esc(rest.join("|"))}" alt="" onerror="nextIcon(this)">`;
}

// 画像がまだないときの仮サムネイル + アイコン
function thumbInner(game) {
  return `<div class="ph-stripes"></div><span class="ph">${esc(game.emoji || "🎲")}</span>${iconImg(game)}`;
}

function thumbStyle(game) {
  return `background:${game.color || "#f3c48f"}`;
}

function isReady(game) {
  return Boolean(webglUrl(game) || game.apk);
}

// ---------- Unity の ゲームを 枠いっぱいに ----------
// Unity の テンプレートは canvas を 固定の px で 表示するので、
// iframe の中の ページに スタイルを たして、canvas を 枠いっぱいに ひろげる(同じサイトなので さわれる)
const FIT_CSS = `
  html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; background: #000 !important; }
  #unity-container { position: fixed !important; inset: 0 !important; left: 0 !important; top: 0 !important;
    width: 100% !important; height: 100% !important; transform: none !important; }
  #unity-canvas { width: 100% !important; height: 100% !important; display: block !important; }
  #unity-footer { display: none !important; }`;

function fitInsideFrame(frame) {
  try {
    const doc = frame.contentDocument;
    if (!doc || !doc.head || doc.getElementById("kumata-fit")) return;
    const style = doc.createElement("style");
    style.id = "kumata-fit";
    style.textContent = FIT_CSS;
    doc.head.appendChild(style);
  } catch (e) { /* べつのサイトの ゲームなら なにもしない */ }
}

// できるだけ はやく(ページの 中身が できた時点で)スタイルを たす。load でも 念のため。
function fitFrame(frame) {
  const poll = setInterval(() => {
    try {
      const d = frame.contentDocument;
      if (d && d.readyState !== "loading" && d.URL !== "about:blank") { fitInsideFrame(frame); clearInterval(poll); }
    } catch (e) { clearInterval(poll); }
  }, 50);
  frame.addEventListener("load", () => { fitInsideFrame(frame); clearInterval(poll); });
}

// URL の ?id=xxx の ゲームを さがす
function gameFromUrl() {
  const id = new URLSearchParams(location.search).get("id");
  return (window.KUMATA_GAMES || []).find(g => g.id === id);
}

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
