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
    const [lineStatistics, setLineStatistics] = useState<{day: string, checkedRoutines: number | undefined}[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try{
                const req = await fetch(`/api/firebase/statistic/days-statistics`)
                const statistics = await req.json() as StatisticsType[]
                setLineStatistics(statistics.map(stat => ({day: stat.day, checkedRoutines: stat.checkedRoutines?.length || 0})))
                setIsLoading(false)
                // console.log({statistics})
                // console.log(statistics.map(stat => ({day: stat.day, checkedRoutines: stat.checkedRoutines.length})))
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
        labels : lineStatistics?.map(({day}) => day),
        datasets: [
          {
            label: 'Chart of progress',
            data: lineStatistics?.map(({checkedRoutines}) => checkedRoutines), // in case there is no checkedRoutines
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
        <Card loading={isLoading} className=''>
            {
                lineStatistics?.length === 0 ? <h5>There is no statistics yet start checking routines</h5> : <Line options={options} data={data} />
            }
        </Card>
    )
}

export default StatisticLineWProg
