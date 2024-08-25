import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ cars }) => {
  const brandModels = cars.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Extract brand
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = {};
    }
    acc[brand][model] = (acc[brand][model] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(brandModels).flatMap(brand =>
    Object.keys(brandModels[brand]).map(model => `${brand} / ${model}`)
  );

  const data = {
    labels,
    datasets: [{
      label: 'Number of Cars',
      data: labels.map(label => {
        const [brand, model] = label.split(' / ');
        return brandModels[brand] ? brandModels[brand][model] : 0;
      }),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return <Bar data={data} />;
};

export default BarChart;
