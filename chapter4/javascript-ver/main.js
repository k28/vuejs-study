var btnLoad = document.querySelector("#load");
btnLoad.addEventListener("click", function (event) {
  // 情報を読み込む処理

  var xmlHttpRequest = new XMLHttpRequest();

  // 通信の状態の変換を監視する
  xmlHttpRequest.onreadystatechange = function() {
    // readyStateが4は処理が完了, statusはHTTPのステータス
    if (this.readyState == 4 /* && this.status == 200 */) {
      // 受信したデータをコンソールに出力する
      // console.log(this.readyState, this.response);
      var products = this.response;
      var result = document.querySelector("#result");
      result.textContent = "";
      // 商品ノードをDOMに挿入する
      for (var i = 0; i < products.length; i++) {
        var text = "商品ID:" + products[i].id;
        text += " 商品名:" + products[i].name;
        text += " 料金:" + products[i].price;
        text += " 画像パス:" + products[i].image;
        text += " 送料:" + products[i].delv;
        text += " セール対象:" + products[i].isSale;
        var div = document.createElement("div");
        div.textContent = text;
        result.appendChild(div);
      }
    }
  };

  // レンスポンスの形式を指定する
  xmlHttpRequest.responseType = "json";
  // リクエストメソッドと読み込むファイルのパスを指定する
  xmlHttpRequest.open("GET", "products.json");
  // リクエストを送信する(非同期通信)
  xmlHttpRequest.send();
});

