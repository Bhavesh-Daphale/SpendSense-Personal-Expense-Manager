import React from 'react';
import {Chart as ChartJS , ArcElement, Legend , Tooltip} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(
  ArcElement, 
 Legend , 
 Tooltip

)

const CategoryChart = ({ userId }) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const categories = ['Movies','Travel','Food','Gorcery','Movies','Movies','Travel','Food','Gorcery','Movies'];
  const amount = [2354,4575,2305,3474,2354,2354,4575,2305,3474,2354];
 



  return (
    <div className='p-2' style={{height : "100%" , widht : "100%"}}>
      <Doughnut
        data={{
                labels: categories,
                datasets: [{
                  label: '₹',
                  data: amount,
                  backgroundColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)'

                    // 'rgba(140,119,233,255)',
                    // 'rgba(157, 142, 226,255)',
                    // 'rgba(174, 163, 223,255)',
                    // 'rgba(193, 187, 223,225)',
                    // 'rgba(229,214,251,255)',
                    // 'rgba(251,211,245,255)',
                    // 'rgba(213,228,250,255)',
                    // 'rgba(255,253,200,255)'

                    // '#8C77E9',
                    // '#9481EA',
                    // '#9C8AEC',
                    // '#A594EE',
                    // '#AD9EEF',
                    // '#B5A8F1',
                    // '#BDB1F2',
                    // '#C5BBF4',
                    // '#CEC5F6',
                    // '#D6CEF7',


                    '#8C77E9',
                    '#9F76E8',
                    '#B276E8',
                    '#C676E8',
                    '#D976E8',
                    '#76C3E8',
                    '#76AFE8',
                    '#769CE8',
                    '#7688E8',
                    '#7876E8',
                    


                  ],
                  borderColor: [
                    // 'rgba(255,99,132,1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)'
                    'rgba(255, 255, 255, 1)'
                  ],
                  borderWidth: 0,
                  cutout: '60%',
                  borderRadius: 0,
                  
                }]
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
        }}
      />
    </div>
  );
};

export default CategoryChart;
