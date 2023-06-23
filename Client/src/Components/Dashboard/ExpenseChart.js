// import React, { useEffect, useRef } from 'react';
// // import Chart from 'chart.js';
// import { Line } from 'react-chartjs-2';

// const ExpenseChart = ({ userId }) => {
 
//         const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
//         const expenses = [3143,2464,4676,2564,6768,67970,4858,4585,67908,80870,80678,78008]
//         const incomes = [80870,80678,78008,689568,689768,789789,787589,68956,578680,678678,67868678,678678]

  

//   return <Line 
//   data = {{
//     labels: months,
//     datasets: [
//       {
//         label: 'Income',
//         data: incomes,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         fill: 'origin',
//         tension: 0.4,
//       },
//       {
//         label: 'Expenses',
//         data: expenses,
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         fill: 'origin',
//         tension: 0.4,
//       },
//     ],
//   }}
//   options = {{
//     responsive: true,
//     maintainAspectRatio: false,
    
//   }}
//    />;
// };

// export default ExpenseChart;




import React, { useEffect, useRef } from 'react';
import {Chart as ChartJS , LineElement, CategoryScale, LinearScale, PointElement,Filler,Legend , Tooltip} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
 PointElement,
 Filler,
 Legend , 
 Tooltip

)

const ExpenseChart = ({ userId }) => {
  const chartRef = useRef(null);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const expenses = [31430, 24640, 46760 ,50870,40670,68000,34585,56790,40870,60678,48008,23750];
  const incomes = [50870, 80678, 78008 ,80870,80678,78008,68956,79768,79789,80870,80678,78008];
  let chartInstance = null;



  return (
    <div className='' style={{height : "100%" , widht : "100%",}}>
      <Line
        data={{
          labels: months,
          datasets: [
            {
              label: 'Income',
              data: incomes,
              backgroundColor: "rgba(176, 162, 234, 0.5)",
              borderColor: '#8C77E9',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0
            },
            {
              label: 'Expenses',
              data: expenses,
              backgroundColor: "rgba(157, 210, 234,0.6)",
              borderColor: '#76C3E8',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0
            },
          ],
        }}
        options={{
          
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                pointStyle: 'rectRounded'
              }
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
              },
              grid: {
                drawOnChartArea: true
              }
            },
            y: {
              display: false,
              title: {
                display: true,
              },
              grid: {
                drawOnChartArea: true
              }
            },
          },
          
        }}
      />
    </div>
  );
};

export default ExpenseChart;
