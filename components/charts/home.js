import Chart from 'chart.js';

const HomeChart = ({ data, labels, isLoading, uniqueId }) => {
  if (typeof window !== 'undefined' && isLoading === false && data) {
    const homeCtx = document.getElementById('homeChart').getContext('2d');

    let confirmedData;
    let deadData;
    let recoveredData;

    for (const el in data) {
      confirmedData = data.confirmed ? Object.values(data.confirmed) : 'null';
      deadData = data.dead ? Object.values(data.dead) : 'null';
      recoveredData = data.recovered ? Object.values(data.recovered) : 'null';
    }

    const homeChartOptions = {
      legend: {
        display: true,
        labels: {},
      },
    };

    const homeChartData = {
      labels,
      datasets: [
        {
          label: `${uniqueId} : Confirmed`,
          backgroundColor: '#D7D4ED',
          borderColor: '#D7D4ED',
          borderWidth: 5,
          fill: 'none',
          lineTension: 0,
          data: confirmedData,
        },
        {
          label: `${uniqueId} : Dead`,
          backgroundColor: '#333333',
          borderColor: '#333333',
          borderWidth: 5,
          fill: 'none',
          lineTension: 0,
          data: deadData,
        },
        {
          label: `${uniqueId} : Recovered`,
          backgroundColor: '#999999',
          borderColor: '#999999',
          borderWidth: 5,
          fill: 'none',
          lineTension: 0,
          data: recoveredData,
        },
      ],
    };

    const homeChart = new Chart(homeCtx, {
      type: 'line',
      data: homeChartData,
      options: homeChartOptions,
    });
  }
  return null;
};

export default HomeChart;
