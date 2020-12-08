// 読み込みボタンのイベントハンドラを定義
$("#load").on("click", function (evenr) {
  $.ajax({
    url: "products.json", // 通信先URL
    type: "GET", // 使用するHTTPメソッド
    dataType: "json", // レスポンスデータのタイプ
  })
    .done(function (data, textStatus, jqXHR) {
      // 成功時の処理
      updateScreen(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // 失敗時の処理
      console.log("通信が失敗しました")
    });
});

// 商品一覧の描画を更新する
function updateScreen(products) {
  $("#result").empty();

  var list = "";
  for (var i = 0; i < products.length; i++) {
    list += "<div>";
    list += "商品ID:" + products[i].id;
    list += " 商品名:" + products[i].name;
    list += " 料金:" + products[i].price;
    list += " 画像パス:" + products[i].image;
    list += " 送料:" + products[i].delv;
    list += " セール対象:" + products[i].isSale;
    list += "</div>";
  }

  $("#result").append(list);
}
