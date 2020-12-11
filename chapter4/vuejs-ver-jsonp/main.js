
// 数値を通貨書式「#,###,###」に変換するフィルター
Vue.filter('number_format', function(val){
  return val.toLocaleString();
});

// 商品一覧コンポーネント
var app = new Vue({
  el: "#app",
  data: {
    // 表示中の商品数
    count: 0,
    // セール対象 のチェック状態
    showSaleItem: false,
    // 送料無料 のチェック状態
    showDelvFree: false,
    // 並び替え の選択値 (1: 標準, 2: 価格が安い順)
    sortOrder:  1,
    // 商品リスト (JSONPで読み込む)
    products: []
  },
  // ライフサイクルハック
  created : function() {
    // JSONPのURL
    var url = "http://localhost:8080/products.js";
    // 非同期通信でJSONPを読み込む
    $.ajax({
      url: url,                   // 通信先URL
      type: "GET",                // HTTPメソッド
      dataType: "jsonp",          // レスポンスのデータタイプ
      jsonp: "callback",          // クエリパラメータの名前
      jsonpCallback: "products"   // コールバック関数の名前
    })
    .done(function(data, textStatus, jpXHR){
      this.products = data;
    }.bind(this))
    .fail(function(jpXHR, textStatus, errorThrown){
      console.log("通信が失敗しました");
    });
  },
  watch: {
    // セール対象 チェックボックスの状態を監視するウォッチャ
    showSaleItem: function(newVal, oldVal) {
      // ここでproductsの配列を書き換える
      console.log('showSaleItemウォッチャが呼び出されました');
    },
    // 送料無料 チェックボックスの状態を監視するウォッチャ
    showDelvFree: function(newVal, oldVal) {
      console.log('showDelvFreeウォッチャが呼び出されました');
    }
  },
  computed: {
    // 絞り込み後の商品リストを返す算出プロパティ
    filteredList: function() {
      // 絞り込み後の結果を保持する新しい配列
      var result = [];
      for (var i = 0; i < this.products.length; i++) {
        var isShow = true;
        var product = this.products[i];
        if (this.showSaleItem && !product.isSale) {
          isShow = false;
        }
        if (this.showDelvFree && !(product.delv == 0)) {
          isShow = false;
        }

        if (isShow) {
          result.push(product);
        }
      }

      // 新しい配列を並び替える
      if (this.sortOrder == 1) {
        // 標準, 元の順序のままresultにpushしているのでこの時は何もしない
      } else if (this.sortOrder == 2) {
        // 価格が安い順に並び替える
        result.sort(function(a, b){
          return a.price - b.price;
          });
      }

      return result;
    }
  }
});
