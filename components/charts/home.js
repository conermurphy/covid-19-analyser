// import React from 'react';
// import Chart from 'chart.js';

// const HomeChart = (data, labels, isLoading) => {
//   if (typeof window !== 'undefined' && isLoading === false) {
//     const homeCtx = document.getElementById('homeChart').getContext('2d');

//     const homeChartOptions = {
//       legend: {
//         display: false,
//       },
//     };

//     const homeChartData = {
//       labels,
//       datasets: [
//         {
//           label: 'Covid-19 Cases / Status / Country',
//           backgroundColor: 'rgba(255,99,132,0.2)',
//           borderColor: '#D7D4ED',
//           pointBackgroundColor: '#D7D4ED',
//           borderWidth: 5,
//           fill: 'none',
//           lineTension: 0,
//           data,
//         },
//       ],
//     };

//     console.log(labels);

//     const homeChart = new Chart(homeCtx, {
//       type: 'line',
//       data: homeChartData,
//       options: homeChartOptions,
//     });
//   }
// };

// export default HomeChart;
