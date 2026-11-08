/* =========================================================
   カウンター(訪問数・あそばれた回数・ダウンロード数)の 設定

   databaseURL : Firebase Realtime Database の URL
                 例) "https://kumataworld-default-rtdb.asia-southeast1.firebasedatabase.app"
                 Firebase コンソール → Realtime Database の 上に 出ている URL を そのまま はる。

   ""(空)のとき:
     - localhost で ひらいたときだけ「テストモード」(この パソコンの ブラウザの中だけで 数える)
     - 公開サイトでは 数字を 出さない
   ========================================================= */
window.KUMATA_COUNTER_CONFIG = {
  databaseURL: "https://kumataworld-default-rtdb.asia-southeast1.firebasedatabase.app",
};
