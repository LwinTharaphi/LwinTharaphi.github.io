import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ cars }) => {
  const brands = cars.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Extract brand
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(brands),
    datasets: [
      {
        data: Object.values(brands),
        backgroundColor: Object.keys(brands).map((_, i) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
          return colors[i % colors.length];
        }),
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '500px', height: '400px' }}> {/* Adjust size here */}
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
