'use client'

import React, { useEffect, useState } from 'react'
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
import dayjs from 'dayjs';
import { Card } from 'antd';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import { generateLast30Days } from '@/app/(signedIn)/utils';

const Statistic = ({params}: {params: {routineId : string}}) => {
    const {routineId} = params;
    const [stat, setStat] = useState<Record<string, string> | null>(null)

    useEffect(() => {
        ;(async () =>{
            try{
                const res  = await fetch(`/api/firebase/statistic/progress-spentedTime-routine?routineId=${routineId}`)
                const data = await res.json() as Record<string, string>
                setStat(data)
            }catch(error){
                console.error(error)
            }
        })()
    }, [])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: false,
          },
          scales: {
            y:{
              display: true,
              ticks: {
                suggestedMin: 0,
                stepSize: 1, // Set step size to 1 to display one by one
                beginAtZero: true,
              },
            }
          }
        },

    };

    const data = {
        labels: generateLast30Days(),
        datasets: [
          {
            label: 'Chart of progress',
            data: generateLast30Days().map(day => stat && stat[day] ? dayjs(stat[day]).unix() : 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        //   {
        //     label: 'Dataset 2',
        //     data: lineStatistics?.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        //     borderColor: 'rgb(53, 162, 235)',
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //   },
        ],
    };

  return (
    <Card loading={!stat}>
      <Line options={options} data={data} />
    </Card>
  )
}

export default Statistic
