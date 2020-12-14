
// 数値を通過様式「#,###,###」に変換するフィルター
Vue.filter("number_format", function(val){
  return val.toLocaleString();
});

var app = new Vue({
  el: "#app",
  data: {
    // 消費税率
    taxRate: 0.08,
    // 制作したいムービー
    movieType: '余興ムービー',
    // 基本料金(税抜き)
    basePrice: 30000,
    // 割増料金
    addPrice1: 5000,  // 納期が1ヶ月未満の場合
    addPrice2: 10000, // 納期が3週間未満の場合
    addPrice3: 15000, // 納期が2週間未満の場合
    addPrice4: 20000, // 納期が1週間未満の場合
    addPrice5: 40000, // 納期が3日後の場合
    addPrice6: 45000, // 納期が2日後の場合
    addPrice7: 50000, // 納期が翌日の場合
    // オプション料金
    optPrice: 0,
    // 合計金額
    totalPrice: 0,
    // 挙式日(日付)
    wedding_date: '',
    // DVD仕上がり予定日(日付)
    delivery_date: "",
    // オプション「BGM手配」
    opt1_use: false,
    opt1_price: 5000,
    // オプション「撮影」
    opt2_use: false,
    opt2_price: 5000,
    // オプション「DVD盤面印刷」
    opt3_use: false,
    opt3_price: 5000,
    // オプション「写真スキャニング」
    opt4_num: 0,
    opt4_price: 500
  },
  methods: {
    // 税抜き金額を税込金額に変換するメソッド
    incTax: function (untaxed) {
      return Math.floor(untaxed * (1 + this.taxRate));
    },
    // 日付の差分を求める関数
    getDateDiff: function(dateString1, dateString2) {
      // 日付を表す文字列から日付オブジェクトを生成
      var date1 = new Date(dateString1);
      var date2 = new Date(dateString2);
      // 2つの日付の差分(ミリ秒)を計算
      var msDiff = date1.getTime() - date2.getTime();
      // 求めた差分を日付に変換
      return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    },
    // 日付をYYYY-MM-DDの書式で返すメソッド
    formatDate: function(dt) {
      var y = dt.getFullYear();
      var m = ("00" + (dt.getMonth() + 1)).slice(-2);
      var d = ("00" + dt.getDate()).slice(-2);
      return (y + "-" + m + "-" + d);
    }
  },
  computed: {
    // オプション「BGM手配」の税込金額を返す算術プロパティ
    taxedOpt1: function() {
      return this.incTax(this.opt1_price);
    },
    taxedOpt2: function() {
      return this.incTax(this.opt2_price);
    },
    taxedOpt3: function() {
      return this.incTax(this.opt3_price);
    },
    taxedOpt4: function() {
      return this.incTax(this.opt4_price);
    },
    // 基本料金(税込)を計算して返す
    taxedBasePrice: function() {
      // 割増料金
      var addPrice = 0;
      // 納期までの残り日数を計算
      var dateDiff = this.getDateDiff(this.delivery_date, (new Date()).toLocaleString())
      // 割増料金を求める
      if (21 <= dateDiff && dateDiff < 30) {
        // 納期が1ヶ月未満の場合
        addPrice = this.addPrice1;
      } else if (14 <= dateDiff && dateDiff < 21) {
        // 納期が3週間未満の場合
        addPrice = this.addPrice2;
      } else if (7 <= dateDiff && dateDiff < 14) {
        // 納期が2週間未満の場合
        addPrice = this.addPrice3;
      } else if (3 < dateDiff && dateDiff < 7) {
        // 納期が1週間未満の場合
        addPrice = this.addPrice4;
      } else if (dateDiff == 3) {
        // 納期が3日後の場合
        addPrice = this.addPrice5;
      } else if (dateDiff == 2) {
        // 納期が2日後の場合
        addPrice = this.addPrice6;
      } else if (dateDiff == 1) {
        // 納期が翌日の場合
        addPrice = this.addPrice7;
      }

      return this.incTax(this.basePrice + addPrice);
    },
    // オプション料金(税込)を計算して返す
    taxedOptPrice: function() {
      // オプション料金
      var optPrice = 0;
      // フォームコントロールを取得
      // BGM手配
      if (this.opt1_use) { optPrice += this.opt1_price; }
      // 撮影
      if (this.opt2_use) { optPrice += this.opt2_price; }
      // DVD盤面印刷
      if (this.opt3_use) { optPrice += this.opt3_price; }
      if (this.opt4_num == '') {this.opt4_num = 0;}
      optPrice += this.opt4_num * this.opt4_price;
      
      return this.incTax(optPrice);
    },
    taxedTotalPrice: function() {
      return this.taxedBasePrice + this.taxedOptPrice;
    },
    tommorow: function() {
      // DVD仕上がり予定日に翌日以降しか入力できないよにする
      dt = new Date();
      dt.setDate(dt.getDate() + 1);
      return this.formatDate(dt);
    }
  },
  created: function() {
    // 今日の日付を取得
    var dt = new Date();
    // 挙式に2ヶ月後の日付を設定
    dt.setMonth(dt.getMonth() + 2);
    this.wedding_date = this.formatDate(dt);
    // DVD仕上がり予定日に挙式日の1週間前の日付を設定
    dt.setDate(dt.getDate() - 7);
    this.delivery_date = this.formatDate(dt);
  }
});

