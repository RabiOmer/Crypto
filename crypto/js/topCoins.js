var  TopCoins = function(){
    var totalCap;
    var time = 59;
    var init = function(){
        GetMarketCap();
        var inter = setInterval(GetMarketCap,60*1000);
        var inte = setInterval (updateTime,1000);
    }
    var updateTime = function(){
        if(time<=0){
            time = 59;
        }
        $(".time").html(time+ 's');
        console.log(time);
        time --;
    }
    var GetMarketCap = function(){
        console.log('go');
        $.ajax({
                    url: "https://api.coinmarketcap.com/v1/global",
                    method: "get",
                    dataType: 'json'
                }).done(function (data) {
                    // console.log(data.total_market_cap_usd);
                    totalCap = data.total_market_cap_usd;
                    getTopCoine();
                }).fail(function () {

                });
    }
    var getTopCoine = function(){
        $.ajax({
            url: "https://api.coinmarketcap.com/v1/ticker/?limit=5",
            method: "get",
            dataType: 'json'
        }).done(function (data) {
                precentCap(data);
                weekValue(data);
                $('#timer1').show();
                $('#timer').show();
        }).fail(function () {

        });
    };
    var precentCap = function(data){
        var arr = {};
        var otherCoins =0;
        // console.log(totalCap)
        for(var i=0;i<data.length;i++){
            p = (data[i].market_cap_usd/totalCap*100);
            arr[i] = [data[i].name,p];
            // console.log(p,data[i].name);
            otherCoins += p;
        }
        // console.log(otherCoins,'otherCoins1')
        otherCoins = 100 - otherCoins;
        // console.log(otherCoins,'otherCoins')
        drawChart(arr,otherCoins);
        $("#load").hide();
        $("#vox1 #chart_div").show();

    }
    var drawChart = function(arr,otherCoin) {
                  // Load the Visualization API and the corechart package.
                  google.charts.load('current', {'packages':['corechart']});

                  // Set a callback to run when the Google Visualization API is loaded.
                  google.charts.setOnLoadCallback(drawChart);
                  
                  // Callback that creates and populates a data table,
                  // instantiates the pie chart, passes in the data and
                  // draws it.
                  function drawChart() {
                  
                  // Create the data table.
                  
                  
                  // Set chart options
                  var options = {'title':'How Much Pizza I Ate Last Night',
                               'width':400,
                               'height':300};
                  
                  // Instantiate and draw our chart, passing in some options.
                  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                  chart.draw(data, options);
                  

// Create the data table.
var data = new google.visualization.DataTable();
        data.addColumn('string', 'Crypto');
        data.addColumn('number', 'Coin');
        data.addRows([
        [arr[0][0], arr[0][1]],
        [arr[1][0], arr[1][1]],
        [arr[2][0], arr[2][1]],
        [arr[3][0], arr[3][1]],
        [arr[4][0], arr[4][1]],
        ['otherCoin',otherCoin]
        ]);

// Set chart options
var options = {'title':'Cryptocurrency Market Capitalizations',
         'width':400,
         'height':300};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
}
    }
    var weekValue = function(data){
        var newData=[],name,val,d7,h24;
        for(var i=0;i<data.length;i++){
            name = data[i].symbol;
            val = data[i].price_usd;
            h24 = getPrcent(val,data[i].percent_change_24h);
            d7 = getPrcent(val,data[i].percent_change_7d);
            newData[i]=[name,val,h24,d7];
            loadTop5(newData)
        }
    }
    var getPrcent = function (val,x){
        var y;
        y = x*val/100;
        y = y*(-1);
        y = val - y;
        return y;
    }
    var loadTop5 = function(r){
        $("#load1").hide();
        $("#curve_chart").show();
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Time", r[0][0] ,r[1][0] ,r[2][0] ,r[3][0] ,r[4][0]],
            ['7 days',r[0][3],r[1][3],r[2][3],r[3][3],r[4][3]],
            ['24h',  r[0][2],r[1][2],r[2][2],r[3][2],r[4][2]],
            ['now',  r[0][1],r[1][1],r[2][1],r[3][1],r[4][1]],
          ]);
  
          var options = {
            title: 'Top 5 Crypto Coine Value',
            curveType: 'function',
            legend: { position: 'bottom' }
          };
  
          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
          chart.draw(data, options);
        }
    }
    init();
};