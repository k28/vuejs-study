// フィルターをグローバルに定義するならここに定義する
// Vue.filter("number_format", function (val) {
//     return val.toLocaleString();
// });

var app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!",
        price: 1200,
    },
    filters: {
        number_format: function (val) {
            return val.toLocaleString();
        },
        unit: function (val) {
            return val + "円";
        },
    },
});

var comptest = new Vue({
    el: "#comptest",
    data: {
        year: new Date().getFullYear(),
    },
    computed: {
        // 今年が閏年か判定する算術プロパティ
        isUrudoshi: function () {
            if (
                (this.year % 4 == 0 && this.year % 100 != 0) ||
                this.year % 400 == 0
            ) {
                return true;
            } else {
                return false;
            }
        },
    },
});

var cachetest = new Vue({
    el: "#cachetest",
    data: { show: true },
    methods: {
        now1: function () {
            return new Date().toLocaleString();
        },
    },
    computed: {
        now2: function () {
            return new Date().toLocaleString();
        },
    },
});

/*
// ボールをランダムに描画するサンプル
var Mobable = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    };

    this.move = function (x, y) {
        this.pos.x += x;
        this.pos.y += y;
    };
};

// ボールオブジェクトを作成する
var ball = [];
for (var i = 0; i < 100; i++) {
    ball[i] = new Mobable(
        Math.floor(Math.random() * window.innerWidth),
        Math.floor(Math.random() * window.innerHeight)
    );
}

// ボールをブラウザに描画する
for (var i = 0; i < 100; i++) {
    document.write(
        '<div class="ball" style="top:' +
            ball[i].pos.y +
            "px;left:" +
            ball[i].pos.x +
            'px;">●</div>'
    );
}
*/
