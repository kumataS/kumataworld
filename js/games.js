/* =========================================================
   ゲームの登録ファイル
   ここに 1 つ書き足すと、トップの一覧と詳細ページに自動で出ます。

   id       : games フォルダの中の フォルダ名(英数字・スペースなし)
              → games/<id>/webgl/index.html を 自動で つかう
              → games/<id>/<id>_Icon.png(.jpg) を アイコンとして 自動で つかう(512×512)
   category : "edu"(まなぶ) か "play"(あそぶ)
   tagline  : 一覧のカードに出る ひとこと
   description : 詳細ページの説明(\n で改行)
   icon     : そのフォルダに 入れた アイコンの ファイル名(512×512)。"" なら アイコンなし
   thumb    : (書かなくてOK)アイコン以外の画像を つかいたいときだけ
   screenshots : スクリーンショット画像の配列
   webgl    : (書かなくてOK)WebGL がまだ ないゲームは webgl: "" で「じゅんびちゅう」
   apk      : APK のダウンロードURL(GitHub Releases など。空ならボタンなし)
   controls : { pc: [{key, action}], touch: [{key, action}] }
   age / players / updated : 情報欄
   ========================================================= */
window.KUMATA_GAMES = [
  // ======================== まなぶ ゲーム ========================
  {
    id: "いちどういっとにふよんじゅうさんけん",
    title: "いちどういっと にふよんじゅうさんけん",
    icon: "",  // ← アイコンを入れたら ファイル名を書く
    category: "edu",
    tagline: "都道府県の かたちを見て 名前を当てよう!",
    description:
      "47都道府県の かたちが すこしずつ あらわれるよ。名前ボタン(漢字とローマ字つき)から こたえを えらぼう!\n" +
      "じかんが たつと ヒントボールが出てきて、特産品・観光地・山や川・となりの県・県庁所在地などが 見られるよ。\n" +
      "正解は +100点、まちがいは -10点。1問の 制限時間は 1〜99秒で かえられるよ。目指せ 47問 ぜんぶ正解!",
    emoji: "🗾", color: "#45b7ff",
    screenshots: [],
    controls: {
      pc: [
        { key: "クリック", action: "こたえを えらぶ / ヒントボールを ひらく" },
        { key: "+ / −", action: "1問の 制限時間を かえる" },
        { key: "PAUSE", action: "いちじ停止" },
        { key: "HOME", action: "ホームに もどる" },
      ],
      touch: [
        { key: "タップ", action: "こたえを えらぶ / ヒントボールを ひらく" },
        { key: "スワイプ", action: "こたえの 一覧を スクロール" },
      ],
    },
    age: "小学校中学年〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "AroundtheWorld!",
    title: "Around the World!",
    icon: "AroundtheWorld_icon.jpg",
    category: "edu",
    tagline: "国の かたちを見て 195か国の 名前を当てよう!",
    description:
      "世界の国の かたちが すこしずつ あらわれるよ。国名ボタン(日本語と英語・大陸ごとに色分け)から こたえを えらぼう!\n" +
      "ヒントボールは 3だんかい。人口・面積・GDP → 山・川・湖・世界遺産 → 首都 の じゅんに 出てくるよ。\n" +
      "ふつうモードは 195か国から 47問。「195ALL」モードなら 195か国 ぜんぶに チャレンジ!オンラインランキングも あるよ。",
    emoji: "🌏", color: "#2bc4b4",
    screenshots: [],
    controls: {
      pc: [
        { key: "クリック", action: "こたえを えらぶ / ヒントボールを ひらく" },
        { key: "+ / −", action: "1問の 制限時間を かえる" },
        { key: "195ALL", action: "195か国 ぜんぶモードを はじめる" },
        { key: "Enter", action: "ランキングの 名前を 決定" },
      ],
      touch: [
        { key: "タップ", action: "こたえを えらぶ / ヒントボールを ひらく" },
        { key: "スワイプ", action: "こたえの 一覧を スクロール" },
      ],
    },
    age: "小学校高学年〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "PlusMinus",
    title: "PlusMinus",
    icon: "PlusMinus_icon.jpg",
    category: "edu",
    tagline: "式を つくって 10の倍数で 消す 計算パズル!",
    description:
      "「+」「−」と 数字のブロックが 2個セットで 落ちてくる!ならべて 式を つくり、答えが 10・20・30…(10の倍数)に なったら 列ごと 消えるよ。\n" +
      "数字が ならぶと「5 4 → 54」のように 大きな数に、「− −」と つづけば「+」に 早変わり。\n" +
      "大きな式で 消すほど 高得点!頭の体操にも 計算の練習にも ぴったり。",
    emoji: "➕", color: "#5fd068",
    screenshots: [],
    controls: {
      pc: [
        { key: "← →", action: "ブロックを 左右に 動かす" },
        { key: "↓", action: "ブロックを 下に 落とす" },
        { key: "Z / X", action: "ブロックを 回転" },
      ],
      touch: [
        { key: "◀ ▶", action: "ブロックを 左右に 動かす(緑のボタン)" },
        { key: "▼", action: "ブロックを 下に 落とす" },
        { key: "青い矢印", action: "ブロックを 回転" },
        { key: "HOME", action: "タイトルに もどる" },
      ],
    },
    age: "小学校低学年〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "Wakuwaku",
    title: "わくわく",
    icon: "wakuwaku_icon.jpg",
    category: "edu",
    tagline: "図形を ぴったり 枠に つめこむ かたちパズル!",
    description:
      "まる・三角・四角・星・ひし形… 同じ面積の 図形を ドラッグして、枠の中に いくつ 入れられるか チャレンジ!\n" +
      "図形は 回転できるけど、ほかの図形や 枠には かさねられないよ。枠と 同じ種類の 図形は つかえないのが ポイント。\n" +
      "全13ステージの「ステージモード」と、枠や制限時間を 自分で えらべる「自由モード」。オンラインランキングも あるよ!",
    emoji: "🔷", color: "#a77bff",
    screenshots: [],
    controls: {
      pc: [
        { key: "ドラッグ", action: "図形を 枠に 入れる・動かす" },
        { key: "ホイール / Q・E", action: "図形を 回転" },
        { key: "Delete", action: "えらんだ図形を 消す" },
        { key: "ESC", action: "えらぶのを やめる" },
      ],
      touch: [
        { key: "ドラッグ", action: "図形を 枠に 入れる・動かす" },
        { key: "回転ボタン", action: "図形を 右 / 左に 回す" },
        { key: "枠の外へ", action: "図形を 消す" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/01",
  },

  // ======================== あそぶ ゲーム ========================
  {
    id: "JumpSurvival",
    title: "JUMP SURVIVAL",
    icon: "JumpSurvival_icon.jpg",
    category: "play",
    tagline: "板を しならせて 飛べ!トラから にげろ!",
    description:
      "板を ドラッグして しならせ、はなすと ぎゃくの方向に ジャンプ!海に うかぶ 土台に 飛び乗れば クリアだよ。\n" +
      "5秒たつと トラに かまれる!天井・落ちてくる岩や雷・海にも 気をつけて。\n" +
      "すべる氷山、しずむ葉っぱ、重くなる白い雲、運ばれる虹… 21面からは 風と雨も!全30面に チャレンジしよう。",
    emoji: "🐯", color: "#ff9a3c",
    screenshots: [],
    controls: {
      pc: [
        { key: "ドラッグ", action: "板を しならせる → はなして ジャンプ" },
        { key: "Space", action: "つぎの面へ / もう一度" },
        { key: "R", action: "もう一度" },
      ],
      touch: [
        { key: "ドラッグ", action: "板を しならせる → はなして ジャンプ" },
        { key: "タップ", action: "もう一度 / つぎの面へ / 面えらび" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/07",
  },
  {
    id: "SkiBigAir",
    title: "SKI BIG AIR",
    icon: "SkiBigAir_Icon.jpg",
    category: "play",
    tagline: "大ジャンプで 空中技を きめろ!",
    description:
      "ビッグキッカー 1発勝負!助走 → 踏み切り → 空中技 → 着地 で 高得点を ねらおう。\n" +
      "スピン・宙返り・グラブなど 技の むずかしさ、できばえ、着地の きれいさで 点数が つくよ。\n" +
      "好きな技で 採点される「FREE」と、お題の技に いどむ「CHALLENGE」の 2モード。スキーと スノーボードの キャラから えらべるよ。",
    emoji: "⛷️", color: "#7fd3ff",
    screenshots: [],
    controls: {
      pc: [
        { key: "W / S", action: "加速 / ブレーキ" },
        { key: "A / D", action: "左右に 移動" },
        { key: "Space", action: "踏み切り(ジャンプ台の はしで PERFECT)" },
        { key: "ドラッグ", action: "空中で 技を 出す" },
        { key: "Z / X", action: "グラブ" },
        { key: "Shift", action: "回転ストップ" },
        { key: "R", action: "リトライ" },
      ],
      touch: [
        { key: "上スワイプ", action: "スタート / 加速" },
        { key: "下スワイプ", action: "ブレーキ" },
        { key: "JUMP", action: "踏み切り" },
        { key: "空中スワイプ", action: "技を 出す(向きで 技が かわる)" },
        { key: "GRAB L / R", action: "おしている間 グラブ" },
        { key: "タップ", action: "回転ストップ" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/24",
  },
  {
    id: "BallHockey",
    title: "BallHockey",
    icon: "BallHockey_icon.jpg",
    category: "play",
    tagline: "ボールと 弾で たたかう 対戦ホッケー!",
    description:
      "プレイヤーを 左右に 動かして ボールを はじき返し、自分のゴールを まもろう!\n" +
      "ボールを 相手のゴールに 入れるか、弾を 相手に 当てると 1点。弾が へったら、ボールを 壁に 当てると 回復するよ。\n" +
      "「SOLO」は CPU対戦(強さ 5段階)、「DUO」は オンラインで 2人対戦!",
    emoji: "🏒", color: "#ff5c5c",
    screenshots: [],
    controls: {
      pc: [
        { key: "← →", action: "左右に 移動" },
        { key: "ショット", action: "弾を 発射(画面のボタンを クリック)" },
      ],
      touch: [
        { key: "左右ボタン", action: "左右に 移動" },
        { key: "ショット", action: "弾を 発射" },
      ],
    },
    age: "小学生〜", players: "1人(CPU) / 2人オンライン", updated: "2026/10/31",
  },
  {
    id: "はさみん",
    title: "はさみん",
    icon: "hasaminIcon.png",
    category: "play",
    tagline: "駒を かこんで 取りあう ボードゲーム!",
    description:
      "ひし形の 盤の上で じゅんばんに 駒を 動かし、相手の駒の まわりを ぜんぶ ふさぐと その駒を 取れるよ。\n" +
      "取った駒は 盤に 打って つかえる!のこった駒と 取った駒の 数で 点数が きまるよ。\n" +
      "ソロ(AI対戦)・デュオ(2人)・トリオ(3人)の オンライン対戦。「待った」の あり / なしも えらべるよ。",
    emoji: "♟️", color: "#9c7bff",
    screenshots: [],
    controls: {
      pc: [
        { key: "クリック", action: "自分の駒を えらぶ" },
        { key: "A〜F", action: "えらんだ移動先へ 動かす(クリックでもOK)" },
        { key: "取った駒", action: "クリック → 打つ場所を えらぶ" },
        { key: "待った", action: "1手 もどす" },
      ],
      touch: [
        { key: "タップ", action: "駒を えらぶ → 移動先を タップ" },
        { key: "待った", action: "1手 もどす" },
      ],
    },
    age: "小学生〜", players: "1人(AI) / 2〜3人オンライン", updated: "2026/10/31",
  },
  {
    id: "GoritaDaidasso",
    title: "ゴリタ大脱走",
    icon: "ゴリタ大脱走_icon.jpg",
    category: "play",
    tagline: "岩を おして 檻から 脱出!ゴリラの パズルアクション",
    description:
      "檻に とじこめられた ゴリラの「ゴリタ」が、岩を おして 道を ひらき、ゴールの扉を めざすよ。\n" +
      "岩を おすたびに 体力を つかう!バナナで 回復しながら、どの岩を おすか よく考えよう。\n" +
      "追いかけてくる スライムは 岩で はさんで やっつけろ!11×11マスから 101×101マスの 大迷路まで、全10ステージ。",
    emoji: "🦍", color: "#8d6e63",
    screenshots: [],
    controls: {
      pc: [
        { key: "矢印 / WASD", action: "移動(岩に向かうと おす)" },
        { key: "R", action: "リトライ" },
        { key: "Enter / Space", action: "決定" },
      ],
      touch: [
        { key: "方向ボタン", action: "移動(おしっぱなしで 連続)" },
        { key: "スワイプ", action: "1マスずつ 移動" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "GoritaDaidasso2",
    title: "ゴリタ大脱走2",
    icon: "ゴリタ大脱走2_icon.jpg",
    category: "play",
    tagline: "色のブロックを ぶっ叩いて 迷路を 作りかえろ!",
    description:
      "ゴリタが またまた 大脱走!となりの ブロックを 叩くと、同じ色の ブロックが ぜんぶ いっしょに 上がったり 下がったり!\n" +
      "上がったブロックは 壁、下がったブロックは 通路。叩くたびに 迷路の かたちが ガラッと かわるよ。\n" +
      "スライムは ゴリタが 1歩 動くたびに 1歩 動く ターン制。落とし穴に ハメながら ゴールを めざそう!全10ステージ。",
    emoji: "🦍", color: "#ffd23f",
    screenshots: [],
    controls: {
      pc: [
        { key: "矢印 / WASD", action: "移動" },
        { key: "I J K L", action: "ブロックを 叩く / 落とし穴を つくる" },
        { key: "Space / Tab", action: "「叩く」と「落とし穴」を 切りかえ" },
        { key: "R", action: "リトライ" },
        { key: "H", action: "あそびかた" },
      ],
      touch: [
        { key: "左のボタン", action: "移動(スワイプでもOK)" },
        { key: "右のボタン", action: "叩く / 落とし穴を つくる" },
        { key: "切りかえ", action: "「叩く」と「落とし穴」を 切りかえ" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/29",
  },
  {
    id: "CatsWayHome",
    title: "Cat's Way Home",
    icon: "CatsWayHome_icon.jpg",
    category: "play",
    tagline: "動くブロックを よけて ねこを おうちへ!",
    description:
      "ねこが 1マス 動くたびに、矢印の 命令(例:「赤・上」)に したがって その色の ブロックが ぜんぶ 1マス 動くよ。\n" +
      "先の命令を 読んで、ぶつからないように すすもう。おうちに 着けば クリア!\n" +
      "全10ステージ。少ない 手数ほど 上位の ランキングも あるよ。",
    emoji: "🐱", color: "#ff6b9d",
    screenshots: [],
    controls: {
      pc: [
        { key: "矢印キー", action: "ねこが 1マス 移動" },
        { key: "Space", action: "待機(1手 つかう)" },
        { key: "R", action: "やり直し" },
        { key: "G", action: "つぎのステージ" },
        { key: "K", action: "ランキング" },
      ],
      touch: [
        { key: "スワイプ", action: "ねこが 移動" },
        { key: "十字ボタン", action: "ねこが 移動" },
        { key: "待機", action: "その場で 待つ" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "Cat'sWayHome2",
    title: "Cat's Way Home 2",
    icon: "Cat'sWayHome2_icon.jpg",
    category: "play",
    tagline: "マスを 動かして 道を つなげ、ねこを おうちへ!",
    description:
      "盤の まんなかに いる ねこを、4すみの どこかに ある おうちまで 帰してあげよう。\n" +
      "1手ごとに「ねこを 1マス 歩かせる」か「マスを 1枚 スライドする」を えらぶよ。1手ごとに スライムが 近づいてくるから 気をつけて!\n" +
      "盤は 5×5 → 7×7 → 9×9 と だんだん 大きくなるよ。",
    emoji: "🏠", color: "#ffb347",
    screenshots: [],
    controls: {
      pc: [
        { key: "矢印 / WASD", action: "ねこが 歩く" },
        { key: "クリック", action: "マスを 空き枠へ スライド" },
        { key: "Enter / Space", action: "つぎへ" },
        { key: "R", action: "やり直し" },
        { key: "ESC", action: "えらんだマスを 取り消す" },
      ],
      touch: [
        { key: "タップ", action: "マスを えらんで 動かす" },
        { key: "▲▼◀▶", action: "ねこが 歩く" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/27",
  },
];
