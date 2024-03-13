
const options = {
    chart: {
        type: 'line'
    },
    series: [{
        name: 'Bitcoin Price',
        data: []
    }],
    xaxis: {
        type: 'datetime'
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
            y: [item.opening_price, item.high_price, item.low_price, item.trade_price]
        }
    });
    chart.updateSeries([{
        data: seriesData
    }]);
}

fetchData();
