'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LpProgressionLineChart = () => {

  const data = {
    labels: [1,2,3,4,5,6,7,8,9,'...'].map(dayNumber => 'day ' + dayNumber),
    datasets: [{
      label: 'progression is 1% better every day',
      data: [1, 2.71828182846, 7.38905609893, 20.0855369232, 54.5981500331, 148.413159103, 403.428793493, 1096.63315843, 2980.95798704 ,8103.08392758],
      fill: false,
      borderColor: '#009245',
      tension: .3,
    },
    {
        label: 'what do you think progression is',
        data: [0,300,600,900,1200,1500,1800,2100, 2400, 2700,3000],
        fill: false,
        borderColor: '#EA3117',
        tension: 0,
      }]
  };

  const options = {
    responsive: true,
    plugins: {

      // legend: {
      //   position: "bottom",
      // },
      title: {
        display: true,
        text: 'Chart of progression',
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  };

  return (
    <section className="flex flex-col w-full  p-4  sm:col-span-2 sm:flex-row sm:gap-5 sm:justify-between">
      <div className="flex-1">
          <h2 className='h2'>Small Changes, Big Outcomes: Harnessing the Power of Exponential Growth</h2>
          <p className='text-gray-800 text-justify'>Small changes often appear to make no difference until you cross a critical threshold. The most powerful outcomes of any compounding process are delayed. You need to be patient.</p>
      </div>
      <div className='flex-1 flex justify-center sm:w-1/2'>
        <Line options={options} data={data}/>
      </div>
    </section>
  )
}

export default LpProgressionLineChart
