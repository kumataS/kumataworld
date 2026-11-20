/* =========================================================
   ゲームの登録ファイル
   ここに 1 つ書き足すと、トップの一覧と詳細ページに自動で出ます。

   id       : games フォルダの中の フォルダ名(英数字・スペースなし)
              → games/<id>/webgl/index.html を 自動で つかう
              → games/<id>/<id>_Icon.png(.jpg) を アイコンとして 自動で つかう(512×512)
   category : "edu"(まなぶ) か "play"(あそぶ)
   subject  : まなぶ の 教科名("算数" など)。「まなぶ」の よこに 水色で 出る
   tagline  : 一覧のカードに出る ひとこと
   description : 詳細ページの説明(\n で改行)
   icon     : そのフォルダに 入れた アイコンの ファイル名(512×512)。"" なら アイコンなし
   thumb    : (書かなくてOK)アイコン以外の画像を つかいたいときだけ
   screenshots : スクリーンショット画像の配列
   webgl    : (書かなくてOK)WebGL がまだ ないゲームは webgl: "" で「じゅんびちゅう」
   apk      : APK のダウンロードURL(APK_RELEASE + "ファイル名"。空ならボタンなし)
   youtube  : YouTube ショート動画の URL(書くと 一覧の Android ボタンの 右に「どうが」ボタンが 出る)
   googlePlay : Google Play で 公開中なら その ページの URL(GOOGLE_PLAY + "パッケージ名")。
                書くと Android の ダウンロード画面で Google Play を いちばんに 案内する(APK は 下に のこる)
   controls : { pc: [{key, action}], touch: [{key, action}] }
   seo      : 検索(Google)むけの { title: ページの題名, description: 説明文(120文字くらい)}
   age / players / updated : 情報欄
   ========================================================= */
// Android の APK は GitHub Releases(タグ android)に おく。サイトの 容量(1GB)に 数えられないため。
// https://github.com/kumataS/kumataworld/releases/tag/android
const APK_RELEASE = "https://github.com/kumataS/kumataworld/releases/download/android/";
// Google Play の アプリの ページ(うしろに パッケージ名を つける)
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=";

window.KUMATA_GAMES = [
  // ======================== まなぶ ゲーム ========================
  {
    id: "いちどういっとにふよんじゅうさんけん",
    title: "いちどういっと にふよんじゅうさんけん",
    icon: "いちどういっとにふよんじゅうさんけん_icon.jpg",
    seo: {
      title: "都道府県クイズ「いちどういっと にふよんじゅうさんけん」 無料の地理ゲーム",
      description: "47都道府県の形を見て名前を当てる無料の都道府県クイズゲーム。特産品・観光地・山や川・県庁所在地のヒントつき。小学生の社会・地理の勉強や家庭学習に。PC・iPhoneのブラウザ、Androidアプリで遊べます。",
    },
    category: "edu", subject: "地理",
    tagline: "都道府県の かたちを見て 名前を当てよう!",
    description:
      "47都道府県の かたちが すこしずつ あらわれるよ。名前ボタン(漢字とローマ字つき)から こたえを えらぼう!\n" +
      "じかんが たつと ヒントボールが出てきて、特産品・観光地・山や川・となりの県・県庁所在地などが 見られるよ。\n" +
      "正解は +100点、まちがいは -10点。1問の 制限時間は 1〜99秒で かえられるよ。目指せ 47問 ぜんぶ正解!",
    emoji: "🗾", color: "#45b7ff",
    screenshots: [],
    apk: APK_RELEASE + "JapanesePrefecture250601.apk",
    youtube: "https://youtube.com/shorts/KtZ7R1oDiDI",
    googlePlay: GOOGLE_PLAY + "com.kumata.japaneseprefectures3",
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
    seo: {
      title: "国当てクイズ「Around the World!」 世界195か国の地理ゲーム",
      description: "国の形を見て国名を当てる無料の世界地理クイズ。人口・面積・首都・世界遺産のヒント、195か国ぜんぶに挑む「195ALL」モード、オンラインランキングつき。地理の勉強や中学受験の対策にも。",
    },
    category: "edu", subject: "地理",
    tagline: "国の かたちを見て 195か国の 名前を当てよう!",
    description:
      "世界の国の かたちが すこしずつ あらわれるよ。国名ボタン(日本語と英語・大陸ごとに色分け)から こたえを えらぼう!\n" +
      "ヒントボールは 3だんかい。人口・面積・GDP → 山・川・湖・世界遺産 → 首都 の じゅんに 出てくるよ。\n" +
      "ふつうモードは 195か国から 47問。「195ALL」モードなら 195か国 ぜんぶに チャレンジ!オンラインランキングも あるよ。",
    emoji: "🌏", color: "#2bc4b4",
    screenshots: [],
    apk: APK_RELEASE + "AroundtheWorld.apk",
    youtube: "https://youtube.com/shorts/AwxoGamoApU",
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
    seo: {
      title: "計算パズル「PlusMinus」 10の倍数で消す算数ゲーム",
      description: "+と−と数字のブロックで式をつくり、答えが10の倍数になると消える無料の落ちもの計算パズル。足し算・引き算の練習や頭の体操に。小学生から大人まで、ブラウザとAndroidで遊べます。",
    },
    category: "edu", subject: "算数",
    tagline: "式を つくって 10の倍数で 消す 計算パズル!",
    description:
      "「+」「−」と 数字のブロックが 2個セットで 落ちてくる!ならべて 式を つくり、答えが 10・20・30…(10の倍数)に なったら 列ごと 消えるよ。\n" +
      "数字が ならぶと「5 4 → 54」のように 大きな数に、「− −」と つづけば「+」に 早変わり。\n" +
      "大きな式で 消すほど 高得点!頭の体操にも 計算の練習にも ぴったり。",
    emoji: "➕", color: "#5fd068",
    screenshots: [],
    apk: APK_RELEASE + "PlusMinus.apk",
    youtube: "https://youtube.com/shorts/-fAFOR2QXJE",
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
    seo: {
      title: "図形パズル「わくわく」 形を枠につめこむ算数ゲーム",
      description: "まる・三角・星など同じ面積の図形を回転させて、枠にいくつ入るか挑戦する無料の図形パズル。全13ステージと自由モード、オンラインランキングつき。図形感覚・空間認識のトレーニングに。",
    },
    category: "edu", subject: "算数",
    tagline: "図形を ぴったり 枠に つめこむ かたちパズル!",
    description:
      "まる・三角・四角・星・ひし形… 同じ面積の 図形を ドラッグして、枠の中に いくつ 入れられるか チャレンジ!\n" +
      "図形は 回転できるけど、ほかの図形や 枠には かさねられないよ。枠と 同じ種類の 図形は つかえないのが ポイント。\n" +
      "全13ステージの「ステージモード」と、枠や制限時間を 自分で えらべる「自由モード」。オンラインランキングも あるよ!",
    emoji: "🔷", color: "#a77bff",
    screenshots: [],
    apk: APK_RELEASE + "Wakuwaku.apk",
    youtube: "https://youtube.com/shorts/u-W6kRReyog",
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
  {
    id: "DiceCalculation",
    title: "Dice Calculation",
    icon: "DiceCaluculation_icon.jpg",
    seo: {
      title: "計算ゲーム「Dice Calculation」 サイコロで式をつくる算数パズル",
      description: "サイコロを転がして出た目と+−で式をつくり、ターゲットの数を目指す無料の計算パズル。1本の式から5×10の盤まで3つのレベル。小学生の計算練習や大人の頭の体操に。ブラウザですぐ遊べます。",
    },
    category: "edu", subject: "算数",
    tagline: "サイコロで 式を つくって ターゲットの 数に しよう!",
    description:
      "サイコロを ころがして 出た目を ならべ、「+」「−」の サイコロと くみあわせて 式を つくろう!\n" +
      "となりに ならんだ 目は「1 と 3 → 13」のように 大きな数に なるよ。式の こたえ(Result)を ターゲット(Target)の 数に できたら クリア!\n" +
      "LEVEL 1 は 1本の 式、LEVEL 2 は 5×5 の たて・よこ 10本、LEVEL 3 は 5×10 の 15本に チャレンジ。",
    emoji: "🎲", color: "#7b8cff",
    screenshots: [],
    apk: APK_RELEASE + "DiceCalculation.apk",
    youtube: "https://youtube.com/shorts/yZCIWtwvDo0",
    controls: {
      pc: [
        { key: "ドラッグ", action: "サイコロを 上下左右に ころがして 目を かえる" },
        { key: "クリック", action: "「+」と「−」を きりかえる" },
        { key: "+−を ドラッグ", action: "となりの サイコロと 入れかえる" },
        { key: "ReStart", action: "あたらしい もんだいで やりなおす" },
      ],
      touch: [
        { key: "スワイプ", action: "サイコロを 上下左右に ころがして 目を かえる" },
        { key: "タップ", action: "「+」と「−」を きりかえる" },
        { key: "+−を スワイプ", action: "となりの サイコロと 入れかえる" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/10/31",
  },
  {
    id: "クマタのお水屋さん",
    title: "クマタのお水屋さん",
    icon: "kumataMizuya_icon.jpg",
    seo: {
      title: "水はかりパズル「クマタのお水屋さん」 目盛りのない容器で量る無料ゲーム",
      description: "目盛りのない容器だけで、お客さんの注文どおりの量の水を作る算数パズル。水をくむ・うつす・すてるを組み合わせて全30問。答え合わせで最短の手順も見られます。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "edu", subject: "算数",
    tagline: "目盛りのない 容器で ピッタリの 水を はかろう!",
    description:
      "小さな クマタの お水屋さん。お客さんが ちゅうもんする 量の 水を、目盛りのない 容器だけで 作って 出そう!\n" +
      "容器を 水で いっぱいにして、べつの 容器に うつして、あまりを すてて… 頭を ひねって ピッタリの 量に しよう。\n" +
      "すてた 水や のこった 水が 少ないほど 高得点。全30問、さいごは 超難関!わからないときは「答え合わせ」で 手順が 見られるよ。",
    emoji: "🥛", color: "#5bc0eb",
    screenshots: [],
    apk: APK_RELEASE + "KumataMizuya.apk",
    youtube: "https://youtube.com/shorts/FN5PhJZKEsM",
    controls: {
      pc: [
        { key: "クリック", action: "容器を えらぶ / ボタンを おす" },
        { key: "注ぐ → 容器", action: "えらんだ 容器の 水を べつの 容器へ うつす" },
        { key: "蛇口 / 捨てる", action: "水を いっぱいに する / バケツに すてる" },
        { key: "お客に出す", action: "えらんだ 容器を お客さんに 出す" },
        { key: "Esc", action: "注ぐのを やめる" },
      ],
      touch: [
        { key: "タップ", action: "容器を えらぶ / ボタンを おす" },
        { key: "注ぐ → 容器", action: "えらんだ 容器の 水を べつの 容器へ うつす" },
      ],
    },
    age: "小学校中学年〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "クマタのパン屋さん",
    title: "クマタのパン屋さん",
    icon: "kumataPan_icon.jpg",
    seo: {
      title: "パン生地切り分けゲーム「クマタのパン屋さん」 目分量で同じ重さに分ける無料ゲーム",
      description: "山のようにふくらんだパン生地を、包丁で切って注文どおりの重さに分ける目分量パズル。同じ重さでN等分、100gを何個・200gを何個など全30問。ずれが少ないほど高得点、早く終えるとスピードボーナス。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "edu", subject: "算数",
    tagline: "目分量で ピッタリの 重さに 切り分けよう!",
    description:
      "小さな クマタが パン職人に! 店長の ねこが「〜を ◯個 作るにゃ!」と 注文するよ。\n" +
      "生地の まわりの 2点を タップすると まっすぐ 線が 引かれて、クマタが 大きな 包丁で 切ってくれる。でも クマタの 切り方は ちょっと てきとう…\n" +
      "生地は まん中が ふくらんだ 山の 形。見た目の 大きさだけでなく 高さも 考えて、マスに のせて「配分完了」! ずれが 少ないほど 高得点、全部 のせて 早く 終わると スピードボーナス。全30問。",
    emoji: "🍞", color: "#e8a24a",
    screenshots: [],
    apk: APK_RELEASE + "KumataPan.apk",
    youtube: "https://youtube.com/shorts/ZdHpaJXm9L8",
    controls: {
      pc: [
        { key: "切る → 2点クリック", action: "その 2点を むすぶ 線で 生地を 切る" },
        { key: "運ぶ → 生地 → マス", action: "えらんだ 生地を マス(または 作業台)へ 運ぶ" },
        { key: "こね直す", action: "切った 生地を まとめて 元の 形に もどす" },
        { key: "配分完了", action: "採点する" },
      ],
      touch: [
        { key: "切る → 2点タップ", action: "その 2点を むすぶ 線で 生地を 切る" },
        { key: "運ぶ → 生地 → マス", action: "えらんだ 生地を マスへ 運ぶ" },
      ],
    },
    age: "小学校中学年〜", players: "1人", updated: "2026/11/16",
  },
  {
    id: "AngouMistery(英語版)",
    title: "Mystery of the Lost Island",
    icon: "Mystery of the Lost Island_icon.jpg",
    seo: {
      title: "英語の暗号解読ゲーム「Mystery of the Lost Island」 無料の謎解きアドベンチャー",
      description: "アルファベットが入れかわった英語の暗号を解読しながら、島の謎を解く無料の謎解きアドベンチャー。解けたセリフには日本語訳も表示できるので、英語の勉強にも。全4話。PC・スマホのブラウザで遊べます。",
    },
    category: "edu", subject: "英語",
    tagline: "英語の 暗号を 解いて 島の なぞを 追え!",
    description:
      "島の 住人たちの 英語は、アルファベットが 入れかわった 暗号に なっていた!\n" +
      "クマタに なって 住人と 話し、島を 調べ、A〜Z の 文字を 入れかえて 暗号を 解読しよう。\n" +
      "「日本語訳」ボタンで、解けた セリフに 日本語訳が 出るよ。全4話、さいごは 26文字 ぜんぶの 解読に チャレンジ!",
    emoji: "🏝️", color: "#3fb8af",
    screenshots: [],
    apk: APK_RELEASE + "LostIsland.apk",
    youtube: "https://youtube.com/shorts/EsX2FX4rPKM",
    controls: {
      pc: [
        { key: "クリック", action: "歩く / 話しかける / 調べる / 会話を すすめる" },
        { key: "矢印 / WASD", action: "歩く" },
        { key: "Space / Enter / Z", action: "話しかける・調べる / 会話を すすめる" },
        { key: "Tab", action: "Decoder(文字の 入れかえ)を ひらく・とじる" },
      ],
      touch: [
        { key: "タップ", action: "歩く / 話しかける / 調べる / 会話を すすめる" },
        { key: "Decoder", action: "2つの 文字を えらんで 入れかえる" },
        { key: "ドラッグ", action: "会話ログを スクロール" },
      ],
    },
    age: "小学校高学年〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "AngouMistery(日本語版)",
    title: "動物たちの秘密の屋敷",
    icon: "動物たちの秘密の屋敷_icon.jpg",
    seo: {
      title: "暗号解読ミステリー「動物たちの秘密の屋敷」 ひらがな暗号の無料謎解きゲーム",
      description: "動物たちの言葉は、ひらがなが入れかわった暗号だった。話を聞き、部屋を調べ、五十音パネルで文字を入れかえて解読し、事件の真相を推理する無料の謎解きゲーム。全4話。PC・スマホのブラウザで遊べます。",
    },
    category: "edu", subject: "国語",
    tagline: "ひらがなの 暗号を 解いて 事件を 推理しよう!",
    description:
      "動物たちの 話す ことばは、ひらがなが バラバラに 入れかわった「暗号」に なっていた!\n" +
      "クマタに なって 動物たちと 話し、部屋の 物を 調べ、五十音パネルで 文字を 入れかえて 解読しよう。正しく 解けた 文字は 赤く なるよ。\n" +
      "ことばが 読めたら 事件の 真相を 推理!大きな家・動物の村・森の研究所・古代遺跡の 全4話。",
    emoji: "🔍", color: "#b07cc6",
    screenshots: [],
    apk: APK_RELEASE + "AngouMystery.apk",
    youtube: "https://youtube.com/shorts/uOcSFY0eLh4",
    controls: {
      pc: [
        { key: "クリック", action: "歩く / 話しかける / 調べる / 会話を すすめる" },
        { key: "矢印 / WASD", action: "歩く" },
        { key: "Space / Enter / Z", action: "話しかける・調べる / 会話を すすめる" },
        { key: "Tab", action: "解読パネルを ひらく・とじる" },
      ],
      touch: [
        { key: "タップ", action: "歩く / 話しかける / 調べる / 会話を すすめる" },
        { key: "解読パネル", action: "2つの 文字を えらんで 入れかえる" },
        { key: "ドラッグ", action: "会話ログを スクロール" },
      ],
    },
    age: "小学校中学年〜", players: "1人", updated: "2026/11/14",
  },

  {
    id: "ElementWars",
    title: "Oくん 元素の海をいく!(体験版)",
    icon: "ElementWars_icon.jpg",
    seo: {
      title: "「Oくん 元素の海をいく!」 元素を集めて化学反応で戦う3Dアクション 体験版",
      description: "酸素のOくんが元素の世界を冒険する3Dアクションゲームの体験版。元素を集めて化学反応の弾で敵やボスと戦い、元素図鑑を完成させよう。水素・炭素・鉄の3ステージをブラウザで無料で遊べます。",
    },
    category: "edu", subject: "化学",
    tagline: "元素を 集めて 化学反応で たたかえ!",
    description:
      "酸素の Oくんが 元素の世界を 冒険する 3Dアクション!\n" +
      "とちゅうで 集めた 元素を 組みあわせて 化学反応の 弾を うち、敵や ボスを たおそう。集めた 元素は 図鑑で 調べられるよ。\n" +
      "この 体験版では 水素・炭素・鉄の 3ステージが 遊べるよ。(データが 大きいので、はじめの 読みこみに 時間が かかります)",
    emoji: "🧪", color: "#4aa8ff",
    screenshots: [],
    controls: {
      pc: [
        { key: "↑ / ↓", action: "前へ / 後ろへ" },
        { key: "← / →", action: "向きを かえる" },
        { key: "E / Q", action: "上へ / 下へ" },
        { key: "Shift", action: "ダッシュ" },
        { key: "Space", action: "弾を うつ" },
        { key: "Z / X", action: "弾を えらぶ" },
        { key: "R", action: "レーダー" },
        { key: "Tab / F", action: "元素図鑑" },
      ],
      touch: [
        { key: "左の スティック", action: "移動" },
        { key: "↑ / ↓ ボタン", action: "上へ / 下へ" },
        { key: "元素ボタン", action: "弾を うつ" },
        { key: "図鑑 / radar", action: "元素図鑑 / レーダー" },
      ],
    },
    apk: APK_RELEASE + "ElementWars.apk",
    youtube: "",
    age: "小学生〜", players: "1人", updated: "2026/11/15",
  },
  // ======================== あそぶ ゲーム ========================
  {
    id: "BallDown",
    title: "BALL DOWN",
    icon: "BallDown_icon.jpg",
    seo: {
      title: "「BALL DOWN」 円盤をかたむけてボールを穴に落とす無料ゲーム",
      description: "円盤をかたむけてボールを転がし、穴に落として下の段へ進むバランスゲーム。外に落ちたらゲームオーバー。動くじゃま物や回る円盤もある全5ステージ、制限時間120秒。PCはマウス、スマホはタッチで、ブラウザから無料で遊べます。",
    },
    category: "play",
    tagline: "円盤を かたむけて ボールを 穴に 落とそう!",
    description:
      "円盤を かたむけて ボールを ころがし、穴に 落として 下の 段へ 進もう!\n" +
      "円盤の 外に 落ちたら ゲームオーバー。1ステージ 5段、制限時間は 120秒。早く クリアするほど ボーナス点!\n" +
      "上下に 動く じゃま物や、くるくる 回る 円盤も… 全5ステージに チャレンジしよう。",
    emoji: "🔴", color: "#e53935",
    screenshots: [],
    apk: APK_RELEASE + "BallDown.apk",
    youtube: "",
    controls: {
      pc: [
        { key: "クリック(長押し)", action: "おしている 間、その 方向へ かたむく。円盤の 中心から 遠いほど 強く かたむく" },
      ],
      touch: [
        { key: "タッチ(長押し)", action: "おしている 間、その 方向へ かたむく。中心から 遠いほど 強い" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/16",
  },
  {
    id: "JumpSurvival",
    title: "JUMP SURVIVAL",
    icon: "JumpSurvival_icon.jpg",
    seo: {
      title: "「JUMP SURVIVAL」 板をしならせて跳ぶ無料アクションゲーム",
      description: "板をしならせてジャンプし、トラから逃げて海に浮かぶ土台へ飛び移る物理アクションゲーム。すべる氷山や雲、風と雨などのギミックで全30面。PC・スマホのブラウザとAndroidで無料で遊べます。",
    },
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
    apk: "games/JumpSurvival/JumpSurvival.apk",
    youtube: "https://youtube.com/shorts/Ks3ESdybF6E",
    age: "小学生〜", players: "1人", updated: "2026/11/07",
  },
  {
    id: "SkiBigAir",
    title: "SKI BIG AIR",
    icon: "SkiBigAir_Icon.jpg",
    seo: {
      title: "「SKI BIG AIR」 スキー・スノボのビッグエア 無料スポーツゲーム",
      description: "ビッグキッカーで大ジャンプし、スピン・宙返り・グラブなどの空中技をきめる無料のスキー・スノーボードゲーム。技の難しさと着地で採点されるFREEと、お題に挑むCHALLENGEの2モード。ブラウザですぐ遊べます。",
    },
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
    apk: APK_RELEASE + "SkiBigAir.apk",
    youtube: "https://youtube.com/shorts/Wqjn0T5uOyg",
    age: "小学生〜", players: "1人", updated: "2026/11/08",
  },
  {
    id: "BallHockey",
    title: "BallHockey",
    icon: "BallHockey_icon.jpg",
    seo: {
      title: "「BallHockey」 ボールと弾でたたかう 無料の対戦ホッケーゲーム",
      description: "ボールをはじき返してゴールを守り、弾も撃ちあう対戦ホッケーゲーム。CPU対戦(強さ5段階)と、オンラインの2人対戦。ブラウザで無料ですぐ遊べます。",
    },
    category: "play",
    tagline: "ボールと 弾で たたかう 対戦ホッケー!",
    description:
      "プレイヤーを 左右に 動かして ボールを はじき返し、自分のゴールを まもろう!\n" +
      "ボールを 相手のゴールに 入れるか、弾を 相手に 当てると 1点。弾が へったら、ボールを 壁に 当てると 回復するよ。\n" +
      "「SOLO」は CPU対戦(強さ 5段階)、「DUO」は オンラインで 2人対戦!",
    emoji: "🏒", color: "#ff5c5c",
    screenshots: [],
    apk: APK_RELEASE + "BallHockey.apk",
    googlePlay: GOOGLE_PLAY + "com.kumata.ballhockey2",
    youtube: "https://youtube.com/shorts/CrxS8t9G-2U",
    controls: {
      pc: [
        { key: "← →", action: "左右に 移動" },
        { key: "スペース", action: "弾を 発射(画面の ショットボタンでも OK)" },
      ],
      touch: [
        { key: "左右ボタン", action: "左右に 移動" },
        { key: "ショット", action: "弾を 発射" },
      ],
    },
    age: "小学生〜", players: "1人(CPU) / 2人オンライン", updated: "2026/11/08",
  },
  {
    id: "はさみん",
    title: "はさみん",
    icon: "hasaminIcon.png",
    seo: {
      title: "「はさみん」 駒をかこんで取りあう 無料のオンラインボードゲーム",
      description: "相手の駒のまわりをふさいで取り、取った駒を打って使える無料のボードゲーム。AI対戦と、2人・3人のオンライン対戦。囲碁や将棋が好きな人にも。ブラウザとAndroidで遊べます。",
    },
    category: "play",
    tagline: "駒を かこんで 取りあう ボードゲーム!",
    description:
      "ひし形の 盤の上で じゅんばんに 駒を 動かし、相手の駒の まわりを ぜんぶ ふさぐと その駒を 取れるよ。\n" +
      "取った駒は 盤に 打って つかえる!のこった駒と 取った駒の 数で 点数が きまるよ。\n" +
      "ソロ(AI対戦)・デュオ(2人)・トリオ(3人)の オンライン対戦。「待った」の あり / なしも えらべるよ。",
    emoji: "♟️", color: "#9c7bff",
    screenshots: [],
    apk: APK_RELEASE + "hasamin.apk",
    googlePlay: GOOGLE_PLAY + "com.kumata.hasamin",
    youtube: "https://youtube.com/shorts/RaU-YiXW5iQ",
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
    seo: {
      title: "「ゴリタ大脱走」 岩をおして迷路から脱出する 無料パズルゲーム",
      description: "ゴリラのゴリタが岩をおして道をひらき、ゴールを目指す倉庫番風のパズルアクション。体力とバナナ、追いかけてくるスライムに注意。11×11から101×101マスの大迷路まで全10ステージ。ブラウザとAndroidで無料。",
    },
    category: "play",
    tagline: "岩を おして 檻から 脱出!ゴリラの パズルアクション",
    description:
      "檻に とじこめられた ゴリラの「ゴリタ」が、岩を おして 道を ひらき、ゴールの扉を めざすよ。\n" +
      "岩を おすたびに 体力を つかう!バナナで 回復しながら、どの岩を おすか よく考えよう。\n" +
      "追いかけてくる スライムは 岩で はさんで やっつけろ!11×11マスから 101×101マスの 大迷路まで、全10ステージ。",
    emoji: "🦍", color: "#8d6e63",
    screenshots: [],
    apk: APK_RELEASE + "GoritaDaidasso.apk",
    youtube: "https://youtube.com/shorts/Gyq7auhMUlI",
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
    seo: {
      title: "「ゴリタ大脱走2」 色ブロックで迷路を作りかえる 無料パズルゲーム",
      description: "ブロックを叩くと同じ色のブロックがいっせいに上下し、迷路の形が変わる頭脳派パズル。ターン制で動くスライムを落とし穴にはめながらゴールへ。全10ステージ。ブラウザとAndroidで無料で遊べます。",
    },
    category: "play",
    tagline: "色のブロックを ぶっ叩いて 迷路を 作りかえろ!",
    description:
      "ゴリタが またまた 大脱走!となりの ブロックを 叩くと、同じ色の ブロックが ぜんぶ いっしょに 上がったり 下がったり!\n" +
      "上がったブロックは 壁、下がったブロックは 通路。叩くたびに 迷路の かたちが ガラッと かわるよ。\n" +
      "スライムは ゴリタが 1歩 動くたびに 1歩 動く ターン制。落とし穴に ハメながら ゴールを めざそう!全10ステージ。",
    emoji: "🦍", color: "#ffd23f",
    screenshots: [],
    apk: APK_RELEASE + "GoritaDaidasso2.apk",
    youtube: "https://youtube.com/shorts/8G6xtOghUmY",
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
    id: "GoritaDaidasso3",
    title: "ゴリタ大脱走3",
    icon: "Gorita3_icon.jpg",
    seo: {
      title: "「ゴリタ大脱走3」 背中の磁石で岩を引っぱる 無料迷路パズル",
      description: "背中に磁石をつけたゴリタが、岩を引っぱってスライムの通り道をふさぎ、迷路から脱出するパズルアクション。バナナで岩をこわして危機を脱出！全30ステージ、最大101×101の巨大迷路。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "磁石で 岩を 引っぱって スライムを ふさげ!",
    description:
      "ゴリタの 背中には 磁石!はなれるように 歩くと 岩が ついてくるよ(押すことは できない)。\n" +
      "岩で 道を ふさいで、おいかけてくる スライムを よけながら 光る ゴールの とびらを めざそう。\n" +
      "バナナを 使えば 前の 岩を こわせる!迷路は だんだん 大きくなって、最後は 101×101。全30ステージ!",
    emoji: "🦍", color: "#8d6e63",
    screenshots: [],
    apk: APK_RELEASE + "GoritaDaidasso3.apk",
    youtube: "https://youtube.com/shorts/yIU4yRxzO80",
    controls: {
      pc: [
        { key: "矢印 / WASD", action: "ゴリタが 歩く(おしっぱなしで 歩きつづける)" },
        { key: "Space / X", action: "バナナで 前の 岩を こわす" },
        { key: "R", action: "やり直し" },
        { key: "P", action: "画面の 十字ボタンを 出す・消す" },
      ],
      touch: [
        { key: "▲▼◀▶ / スワイプ", action: "ゴリタが 歩く" },
        { key: "バナナボタン", action: "前の 岩を こわす" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "GoritaDaidasso4",
    title: "ゴリタ大脱走4",
    icon: "Gorita4_icon.jpg",
    seo: {
      title: "「ゴリタ大脱走4」 回転扉でスライムをまく 無料迷路パズル",
      description: "ゴリタがさわった回転扉を回して通り道を変え、追いかけてくるスライムをまいて脱出するパズル。赤い扉は全部いっしょに回る！手持ちの扉と入れかえることもできます。全10ステージ。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "回転扉を 回して スライムを まけ!",
    description:
      "ゴリタが さわっている 回転扉(I字・L字)を 回すと、通り道が かわるよ。追いかけてくる スライムを まいて 脱出しよう!\n" +
      "赤い扉は ステージの 赤い扉が ぜんぶ いっしょに 回る。白い扉は その扉だけ。\n" +
      "手持ちの 扉 3まいと 入れかえることも できるよ(白か 赤か えらべる)。光る ゴールの とびらを めざせ!全10ステージ。",
    emoji: "🚪", color: "#c0392b",
    screenshots: [],
    apk: APK_RELEASE + "GoritaDaidasso4.apk",
    youtube: "https://youtube.com/shorts/6TZkSuFnfNA",
    controls: {
      pc: [
        { key: "矢印 / WASD", action: "ゴリタが 歩く" },
        { key: "Space / X", action: "さわっている 扉を 右回し" },
        { key: "Z", action: "左回し" },
        { key: "E / C", action: "扉の 交換パネルを ひらく" },
        { key: "R", action: "やり直し" },
        { key: "H", action: "あそびかた(タイトル)" },
      ],
      touch: [
        { key: "十字ボタン / スワイプ", action: "ゴリタが 歩く" },
        { key: "右回し / 左回し", action: "さわっている 扉を 回す" },
        { key: "交換", action: "手持ちの 扉と 入れかえる" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "CatsWayHome",
    title: "Cat's Way Home",
    icon: "CatsWayHome_icon.jpg",
    seo: {
      title: "「Cat's Way Home」 動くブロックをよけてねこを家へ 無料パズルゲーム",
      description: "ねこが1マス動くたびに、命令どおりに色のブロックがいっせいに動く先読みパズル。ぶつからないように進んで、ねこをおうちへ帰そう。全10ステージ、手数ランキングつき。ブラウザとAndroidで無料。",
    },
    category: "play",
    tagline: "動くブロックを よけて ねこを おうちへ!",
    description:
      "ねこが 1マス 動くたびに、矢印の 命令(例:「赤・上」)に したがって その色の ブロックが ぜんぶ 1マス 動くよ。\n" +
      "先の命令を 読んで、ぶつからないように すすもう。おうちに 着けば クリア!\n" +
      "全10ステージ。少ない 手数ほど 上位の ランキングも あるよ。",
    emoji: "🐱", color: "#ff6b9d",
    screenshots: [],
    apk: APK_RELEASE + "CatsWayHome.apk",
    youtube: "https://youtube.com/shorts/8Qdqi3AG8CU",
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
    seo: {
      title: "「Cat's Way Home 2」 マスをスライドして道をつなぐ 無料パズルゲーム",
      description: "ねこを歩かせるか、マスをスライドして道をつなぐかを1手ずつ選び、4すみのおうちを目指すパズル。近づいてくるスライムに注意。5×5から9×9まで。ブラウザとAndroidで無料で遊べます。",
    },
    category: "play",
    tagline: "マスを 動かして 道を つなげ、ねこを おうちへ!",
    description:
      "盤の まんなかに いる ねこを、4すみの どこかに ある おうちまで 帰してあげよう。\n" +
      "1手ごとに「ねこを 1マス 歩かせる」か「マスを 1枚 スライドする」を えらぶよ。1手ごとに スライムが 近づいてくるから 気をつけて!\n" +
      "盤は 5×5 → 7×7 → 9×9 と だんだん 大きくなるよ。",
    emoji: "🏠", color: "#ffb347",
    screenshots: [],
    apk: APK_RELEASE + "CatsWayHome2.apk",
    youtube: "https://youtube.com/shorts/KI4bfEap1yA",
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
  {
    id: "迷子ペンギン",
    title: "Little Lost Penguin",
    icon: "LittleLostPenguin_icon.jpg",
    seo: {
      title: "「Little Lost Penguin」 流氷をジャンプして家に帰る迷子ペンギンの無料アクションゲーム",
      description: "迷子のペンギンを、流れる氷をジャンプで渡っておうちの氷山まで帰そう。重さで割れる氷、キツネやセイウチ、シロクマに注意。助けてくれるアザラシも。全10ステージ。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "流れる 氷を ジャンプして おうちへ 帰ろう!",
    description:
      "迷子に なった ペンギンを、北の「おうちの 氷山」まで 帰して あげよう!\n" +
      "海を 流れる 氷を ジャンプで わたって いくけど、氷には 重さの 限界が あって、乗りすぎると 割れちゃう。\n" +
      "キツネの いたずら、セイウチの 大波、シロクマの 重さ… でも アザラシは ピンチを 助けてくれる 味方だよ。迷子1〜10 の 全10ステージ!",
    emoji: "🐧", color: "#7ec8e3",
    screenshots: [],
    apk: APK_RELEASE + "LittleLostPenguin.apk",
    youtube: "https://youtube.com/shorts/pB1l--dGgDQ",
    controls: {
      pc: [
        { key: "マウスを うごかす", action: "ジャンプ先を ねらう(とどかない場所は 赤)" },
        { key: "クリック", action: "ジャンプ" },
        { key: "やめる", action: "タイトルに もどる" },
      ],
      touch: [
        { key: "タッチしたまま うごかす", action: "ジャンプ先を ねらう" },
        { key: "はなす", action: "ジャンプ" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "ColorColor",
    title: "colorcolor",
    icon: "colorcolor_icon.jpg",
    seo: {
      title: "線を引いて色を広げるパズル「colorcolor」 無料の色ぬり陣取りゲーム",
      description: "盤面に線を引いて、マスを自分の色に染めていく無料のパズルゲーム。色には強さの順番があり、変わったマスがとなりの色を食べて連鎖！10本の線でどれだけ青を増やせるか、ランキングに挑戦。PC・スマホのブラウザで遊べます。",
    },
    category: "play",
    tagline: "線を 引いて、マスを 自分の 色に 染めよう!",
    description:
      "盤面を おして ドラッグすると、5マスの 線が 引けるよ。線が ふれた マスは 色が かわる!\n" +
      "色には 強さの じゅんばん(黄 ▶ 青 ▶ 緑 ▶ 赤 ▶ 黄)が あって、かわった マスが となりの 色を 食べて 連鎖するよ(3連鎖まで)。\n" +
      "線は 10本。青の マスを どれだけ ふやせるかな?同じ マス数なら タイムが はやい ほうが 上の ランキングに チャレンジ!",
    emoji: "🎨", color: "#ffd166",
    screenshots: [],
    apk: APK_RELEASE + "ColorColor.apk",
    youtube: "https://youtube.com/shorts/hLyDmrknhoI",
    controls: {
      pc: [
        { key: "ドラッグ", action: "線の 向きを きめる(予想が 出る)→ はなして 線を 引く" },
        { key: "Shift", action: "向きを 15° ごとに そろえる" },
        { key: "右クリック / Esc", action: "線を やめる" },
        { key: "Enter", action: "ランキングの 名前を 登録" },
      ],
      touch: [
        { key: "ドラッグ", action: "線の 向きを きめる → はなして 線を 引く" },
        { key: "短く タップ", action: "線を やめる" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "ClimbClimb",
    title: "ClimbClimb",
    icon: "ClimbClimb_Icon.jpg",
    seo: {
      title: "岩山クライミングゲーム「ClimbClimb」 手足を動かして頂上を目指す無料ゲーム",
      description: "赤・黄・緑・青の突起をえらび、左手・右手・左足・右足を1つずつ動かして岩山の頂上を目指すクライミングゲーム。色の点数は毎回かわる！消える突起や雪山、反り返った壁など全10ステージ。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "手と 足を 1つずつ うごかして 岩山の 頂上へ!",
    description:
      "突起(赤・黄・緑・青)を えらんで、左手・右手・左足・右足の ボタンで その部位を 付けよう。頂上まで 登れば クリア!\n" +
      "色の 点数(+1 / 0 / -1 / -5)は 毎回 かわるよ。とどかないと -1、合計 -7 で ゲームオーバー。\n" +
      "消える 突起、くずれる 雪、反り返った 壁… 全10ステージ。ゴールの あとは 登りかたの リプレイも 見られるよ!",
    emoji: "🧗", color: "#e07a5f",
    screenshots: [],
    apk: APK_RELEASE + "ClimbClimb.apk",
    youtube: "https://youtube.com/shorts/tluLqgayFfw",
    controls: {
      pc: [
        { key: "クリック", action: "突起を えらぶ" },
        { key: "Q / E / Z / C", action: "左手 / 右手 / 左足 / 右足 を 付ける(ボタンでも OK)" },
        { key: "ホイール / W・S / ドラッグ", action: "上下を 見わたす" },
        { key: "V", action: "カメラを かえる(引き・上から・透明・全体)" },
        { key: "A / D", action: "スタート位置を うごかす(さいしょの 1手まで)" },
        { key: "Enter / Space", action: "スタート" },
      ],
      touch: [
        { key: "タップ", action: "突起を えらぶ / ボタンを おす" },
        { key: "手足ボタン", action: "えらんだ 突起に その部位を 付ける" },
        { key: "上下に ドラッグ", action: "上下を 見わたす" },
        { key: "ピンチ", action: "全体ビューを ズーム" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/14",
  },
  {
    id: "DonguriSoudatsu",
    title: "どんぐり争奪戦",
    icon: "Donguri_icon.png",
    seo: {
      title: "3Dアクションゲーム「どんぐり争奪戦」 リスからどんぐりを取り返す無料ゲーム",
      description: "クマタが大きなかごでリスをつかまえて、どんぐりを取り返す3Dアクションゲーム。どんぐりを持ったリスをねらおう！持っていないリスにかぶせるとかまれるよ。落ち葉にもぐったリスにも注意。全5ステージ。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "大きな かごで リスを つかまえて どんぐりを 取り返せ!",
    description:
      "森の 広場で リスたちが どんぐりを 巣へ 運んでいく! クマタが 大きな かごを かぶせて 取り返そう。\n" +
      "どんぐりを 持った リスに かぶせると 取り返せる。でも 持っていない リスに かぶせると かまれて -1…\n" +
      "落ち葉の モコモコは もぐった リス! 巣に どんぐりが たまると ゲームオーバー。全5ステージ。",
    emoji: "🌰", color: "#b5733a",
    screenshots: [],
    controls: {
      pc: [
        { key: "WASD / 矢印キー / ドラッグ", action: "クマタを うごかす" },
        { key: "スペース / 右クリック", action: "かごを かぶせる" },
      ],
      touch: [
        { key: "画面を なぞる", action: "クマタを うごかす(スティック)" },
        { key: "かぶせる ボタン", action: "かごを かぶせる" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/19",
  },
  {
    id: "GearBall",
    title: "ころころギア工場",
    icon: "GearBall_icon.png",
    seo: {
      title: "歯車パズルゲーム「ころころギア工場」 ギアを組んでボールを箱に入れる無料ゲーム",
      description: "ふしぎなおもちゃ工場で、歯車を穴に置いてかみ合わせ、落ちてくる玉を正しい箱へ運ぶ物理パズル。動力の歯車から白い歯車へ回転を伝えよう。かみ合った歯車は反対向きに回る！全25ステージ。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "歯車を かみ合わせて 玉を 箱まで 運ぼう!",
    description:
      "ふしぎな おもちゃ工場へ ようこそ! 歯車を 穴に 置いて、落ちてくる 玉を 箱まで 運ぶ 物理パズル。\n" +
      "動力の 赤・青の 歯車に 白い 歯車を かみ合わせると 回りだす。かみ合った 歯車は 反対向きに 回るよ。\n" +
      "玉は 箱の 前の 絵と 同じ 箱へ! 少ない ポイントで クリアするほど ★が ふえる。全25ステージ。",
    emoji: "⚙️", color: "#e5533d",
    screenshots: [],
    controls: {
      pc: [
        { key: "ドラッグ", action: "歯車を 穴に 置く / 置いた 歯車を 動かす" },
        { key: "右の パネルへ ドラッグ", action: "歯車を はずす" },
        { key: "スタート", action: "玉を 落とす" },
      ],
      touch: [
        { key: "ドラッグ / えらんで タップ", action: "歯車を 穴に 置く" },
        { key: "パネルへ ドラッグ", action: "歯車を はずす" },
      ],
    },
    age: "小学生〜", players: "1人", updated: "2026/11/19",
  },
  {
    id: "Sensuikan",
    title: "潜水艦 vs 大艦隊",
    icon: "Sensuikan_icon2.png",
    seo: {
      title: "推理ゲーム「潜水艦 vs 大艦隊」 見えない敵艦隊を魚雷で撃沈する無料ゲーム",
      description: "見えない敵艦隊の位置を推理して、潜水艦から魚雷を撃ちこむ作戦ゲーム。敵は毎ターン動き、フェイントもしかけてくる！命中の青いマスから向きと動きを読もう。15×15と21×21、各10面。PC・スマホのブラウザで無料で遊べます。",
    },
    category: "play",
    tagline: "見えない 敵艦隊を 推理して、魚雷で 撃沈せよ!",
    description:
      "海の 下は 見えない! 潜水艦の 艦長になって、敵艦隊が いそうな マスに 魚雷を 撃ちこもう。\n" +
      "命中した マスは 青く 光るよ。敵は 毎ターン 1マス 動いたり 向きを かえたり、フェイントも してくる。\n" +
      "敵艦が 潜水艦の 列まで 来たら ゲームオーバー! 15×15(ふつう)と 21×21(むずかしい)、各10面。さいごは リプレイで 敵の 動きが 見られるよ。",
    emoji: "🚢", color: "#2a6fb8",
    screenshots: [],
    controls: {
      pc: [
        { key: "クリック", action: "魚雷を 撃つ マスを えらぶ" },
        { key: "Enter / Space / 発射!", action: "魚雷を 発射" },
        { key: "選択クリア", action: "えらんだ マスを ぜんぶ 取り消す" },
        { key: "印", action: "撃った 印を ぜんぶ / 最近3回 で 切りかえ" },
      ],
      touch: [
        { key: "タップ", action: "魚雷を 撃つ マスを えらぶ" },
        { key: "発射! ボタン", action: "魚雷を 発射" },
      ],
    },
    age: "小学校中学年〜", players: "1人", updated: "2026/11/19",
  },
];
