var LiveView = function(){
    
    var i = 0;
    var line, v;

    var init = function(){
        var smoothie1 = new SmoothieChart();
        smoothie1.streamTo(document.getElementById("btcCanvas"), 3000);
        var line1 = new TimeSeries();
        smoothie1.addTimeSeries(line1);
        var con1 = new connectws(smoothie1,"wss://stream.binance.com:9443/ws/eth btcusdt@aggTrade", line1, 'btc', $(
            "#btc div"));
    
        var smoothie = new SmoothieChart();
        var line = new TimeSeries();
        var con = new connectws(smoothie,"wss://stream.binance.com:9443/ws/ethusdt@aggTrade", line, 'eth', $(
            "#eth div"));
        smoothie.streamTo(document.getElementById("mycanvas"), 3000);
        smoothie.addTimeSeries(line);
    }

    var connectws = function (smoothie,host, line, coin, location){
        var host = host;
        socket = new WebSocket(host);
        log('WebSocket - status ' + socket.readyState);
        socket.onopen = function () {
            location.attr("class", "con");
            log("Welcome - status " + this.readyState);
        };
        socket.onmessage = function (msg) {
            smoothie.addTimeSeries(line);
            addToS(line, parseFloat(JSON.parse(msg.data).p), coin);
        };
        socket.onclose = function (msg) {
            location.attr("class", "dis");
            log("Disconnected - status " + this.readyState);
        };
    }

    var log = function(msg) {
        // $("body").prepend("<div>[#" + (line++) + "]: " + msg + '</div>');
    }
    var addToS = function (l, data, coin) {
        l.append(new Date().getTime(), data);
    }
    init();
};