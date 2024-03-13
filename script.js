
const options = {
    chart: {
        type: 'line',
        height: 350,
        toolbar: {
            show: false
        }
    },
    title: {
        text: '비트코인 추이',
        align: 'left'
    },
    series: [{
        name: 'Bitcoin Price',
        data: []
    }],
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return value.toLocaleString();
            }
        }
    },
    tooltip: {
        x: {
            format: 'dd MMM yyyy'
        },
        y: {
            formatter: function (value) {
                return value.toLocaleString() + ' KRW';
            }
        }
    }
}

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

async function fetchData() {
    const response = await fetch('https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=30');
    const data = await response.json();
    const seriesData = data.map(item => {
        return {
            x: item.candle_date_time_kst,
            y: item.trade_price
        }
    });
    chart.updateSeries([{
        data: seriesData
    }]);

    // Calculate and add a 7-day moving average line
    const movingAverageData = calculateMovingAverage(seriesData, 7);
    chart.appendSeries({
        name: '7-day Moving Average',
        data: movingAverageData
    }, true);
}

function calculateMovingAverage(data, windowSize) {
    let movingAverageData = [];
    
    for (let i = windowSize - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) {
            sum += data[i - j].y;
        }
        let average = sum / windowSize;
        movingAverageData.push({ x: data[i].x, y: average });
    }

    return movingAverageData;
}

fetchData();
