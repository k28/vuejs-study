// 変数定義

// コンポーネントのルートノード
var app = document.querySelector('#app');
// 消費税率
var taxRate = 0.10;

// イベントハンドラの割り当て

// ページの読み込み完了イベント
window.addEventListener("load", onPageLoad, false);
// 入力内容変更イベント
var eventItems = ["#delivery_date", "#opt1", "#opt2", "#opt3"];
for (var index = 0; index < eventItems.length; index++) {
  app.querySelector(eventItems[index]).addEventListener("change", onInputChanged, false);
}
// スピンボタン付き入力なのでinputイベントに割り当てる
app.querySelector("#opt4").addEventListener("input", onInputChanged, false);

// イベントハンドラ

// ページの読み込みが完了したときにCallさせるイベントハンドラ
function onPageLoad(event) {
  // フォームコントロールを取得
  var wedding_date = app.querySelector("#wedding_date");
  var delivery_date = app.querySelector("#delivery_date");

  // 今日の日付を取得
  var dt = new Date();
  // 挙式日に2ヶ月後の日付を設定
  dt.setMonth(dt.getMonth() + 2);
  wedding_date.value = formatDate(dt);
  // DVD仕上がり予定日に、挙式の1週間前の日付を設定
  dt.setDate(dt.getDate() - 7);
  delivery_date.value = formatDate(dt);
  // DVD仕上がり予定日に翌日以降しか入力できないようにする
  delivery_date.setAttribute("min", tommorow());
  // フォームの表示を更新する
  updateForm();
}

// 入力内容を変更したときに呼び出されるイベントハンドラ
function onInputChanged(event) {
  // フォームの表示を更新する
  updateForm();
}

// 関数

// 日付をYYYY-MM-DDの書式で返すメソッド
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return (y + "-" + m + "-" + d);
}

// 明日の日付をYYYY-MM-DDの書式で返す関数
function tommorow() {
  var dt = new Date();
  dt.setDate(dt.getDate() + 1);
  return formatDate(dt);
}

// 税抜き金額を税込金額に変換する関数
function incTax(untaxed) {
  return Math.floor(untaxed * (1 + taxRate));
}

// 数値を通貨書式「#,###,###」に変換する関数
function number_format(val) {
  return val.toLocaleString();
}

// 日付の差分を求める関数
function getDateDiff(dateString1, dateString2) {
  // 日付を表す文字列から日付オブジェクトを生成
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);
  // 2つの日付の差分(ミリ秒)を計算
  var msDiff = date1.getTime() - date2.getTime();
  // 求めた差分を日付に変換
  return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
}

// 再計算した基本料金(税込)を返す関数
function taxedBasePrice() {
  // 割増料金
  var addPrice = 0;
  // フォームコントロールを取得
  var delivery_date = app.querySelector("#delivery_date");
  // 納期までの残り日数を計算
  var dateDiff = getDateDiff(delivery_date.value, (new Date()).toLocaleString())
  // 割増料金を求める
  if (21 <= dateDiff && dateDiff < 30) {
    // 納期が1ヶ月未満の場合
    addPrice = 5000;
  } else if (14 <= dateDiff && dateDiff < 21) {
    // 納期が3週間未満の場合
    addPrice = 10000;
  } else if (7 <= dateDiff && dateDiff < 14) {
    // 納期が2週間未満の場合
    addPrice = 15000;
  } else if (3 < dateDiff && dateDiff < 7) {
    // 納期が1週間未満の場合
    addPrice = 20000;
  } else if (dateDiff == 3) {
    // 納期が3日後の場合
    addPrice = 40000;
  } else if (dateDiff == 2) {
    // 納期が2日後の場合
    addPrice = 45000;
  } else if (dateDiff == 1) {
    // 納期が翌日の場合
    addPrice = 50000;
  }

  return incTax(30000 + addPrice);
}

// 再計算したオプション料金(税込)を返す関数
function taxedOptPrice() {
  // オプション料金
  var optPrice = 0;
  // フォームコントロールを取得
  var opt1 = app.querySelector("#opt1");
  var opt2 = app.querySelector("#opt2");
  var opt3 = app.querySelector("#opt3");
  var opt4 = app.querySelector("#opt4");
  // BGM手配
  if (opt1.checked) { optPrice += 5000; }
  // 撮影
  if (opt2.checked) { optPrice += 5000; }
  // DVD盤面印刷
  if (opt3.checked) { optPrice += 5000; }
  if (opt4.value == '') {opt4 = 0;}
  optPrice += opt4.value * 500;
  
  return incTax(optPrice);
}

// 金額の表示を更新する関数
function updateForm() {
  // フォームコントロールを取得
  var sum_base  = app.querySelector("#sum_base");
  var sum_opt   = app.querySelector("#sum_opt");
  var sum_total = app.querySelector("#sum_total");
  // 金額を再計算
  var basePrice = taxedBasePrice();
  var optPrice  = taxedOptPrice();
  var totalPrice = basePrice + optPrice;
  // 表示を更新
  sum_base.value = number_format(basePrice);
  sum_opt.value  = number_format(optPrice);
  sum_total.value = number_format(totalPrice);
}

