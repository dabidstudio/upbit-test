
fetch('https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=30')
    .then(response => response.json())
    .then(data => {
        var chartData = data.map(function(candle) {
            return {
                x: new Date(candle.candle_date_time_kst),
                y: [
                    candle.opening_price,
                    candle.high_price,
                    candle.low_price,
                    candle.trade_price
                ]
            };
        }).reverse();

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "비트코인 가격 추이 - 최근 30일"
            },
            axisX: {
                valueFormatString: "DD MMM"
            },
            axisY: {
                prefix: "₩",
                title: "Price"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
            },
            data: [{
                type: "candlestick",
                showInLegend: true,
                name: "Bitcoin",
                yValueFormatString: "₩###,###",
                xValueFormatString: "DD MMM",
                dataPoints: chartData
            }]
        });
        chart.render();
    })
    .catch(error => console.error('Error fetching data:', error));
