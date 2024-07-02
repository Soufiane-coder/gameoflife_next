"use client"
import StatisticsType from '@/types/statistics.type'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
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
import { Card } from 'antd'
import { generateLast30Days } from '@/app/(signedIn)/routine/[routineId]/statistic/page';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const isYesterday = (dateString : string) => {
    // Get the current date
    const currentDate = dayjs();

    // Convert the given date string to a Day.js object
    const givenDate = dayjs(dateString, 'YYYY-MM-DD');

    // Check if the given date is yesterday
    return givenDate.isSame(currentDate.subtract(1, 'day'), 'day');
}

const isToday = (dateString : string) => {
    // Get the current date
    const currentDate = dayjs();

    // Convert the given date string to a Day.js object
    const givenDate = dayjs(dateString, 'YYYY-MM-DD');

    // Check if the given date is today
    return givenDate.isSame(currentDate, 'day');
}

const StatisticLineWProg = () => {
    const [lineStatistics, setLineStatistics] = useState<Record<string, string[]> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try{
                const req = await fetch(`/api/firebase/statistic/checked-routines`)
                const statistics : Record<string, string[]> = await req.json()
                setLineStatistics(statistics)
                setIsLoading(false)
            }catch(error){
                console.error(error)
            }
        })()
    },[])
    
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
              suggestedMin: 0,
              suggestedMax: 10,
              ticks: {
                stepSize: 1 // Set step size to 1 to display one by one
              },
            }
          }
        },

    };

    const data = {
        labels : generateLast30Days(),
        datasets: [
          {
            label: 'Chart of progress',
            data:  generateLast30Days().map(day => lineStatistics && lineStatistics[day] ? lineStatistics[day].length : 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <Card loading={isLoading} className=''>
            <Line options={options} data={data} />
        </Card>
    )
}

export default StatisticLineWProg
