import Chart from 'chart.js';

const HomeChart = ({ data, labels, isLoading, combinedKey }) => {
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

    const pointRadius = 2;
    const borderWidth = 5;
    const lineTension = 0;

    const homeChartData = {
      labels,
      datasets: [
        {
          label: `${combinedKey} : Confirmed`,
          backgroundColor: '#ABD1B5',
          borderColor: '#ABD1B5',
          borderWidth,
          pointRadius,
          fill: 'none',
          lineTension,
          data: confirmedData,
        },
        {
          label: `${combinedKey} : Dead`,
          backgroundColor: '#F1887E',
          borderColor: '#F1887E',
          borderWidth,
          pointRadius,
          fill: 'none',
          lineTension,
          data: deadData,
        },
        {
          label: `${combinedKey} : Recovered`,
          backgroundColor: '#CADAF7',
          borderColor: '#CADAF7',
          borderWidth,
          pointRadius,
          fill: 'none',
          lineTension,
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
