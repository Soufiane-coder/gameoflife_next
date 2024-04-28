"use client"

import StatisticsType from '@/types/statistics.type'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {Line} from '@ant-design/charts'
import { Card } from 'antd'
import { useAppSelector } from '@/redux/hooks'

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
    const [lineStatistics, setLineStatistics] = useState<{day: string, checkedRoutines: number}[] | null>(null)
    const {user} = useAppSelector((state) => state.userReducer)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try{
                const req = await fetch(`/api/firebase/days-statistics?uid=${user?.uid}`)
                const statistics = await req.json() as StatisticsType[]
                setLineStatistics(statistics.map(stat => ({day: stat.day, checkedRoutines: stat.checkedRoutines.length})))
                setIsLoading(false)
            }catch(error){
                console.error(error)
            }
        })()
        
    },[])

    // const options = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             display: true,
    //             // position: 'left',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart of progression',
    //         },
    //     },
    //     scales: {
    //         y: {
    //             display: true,
    //             suggestedMin: 0,
    //             // suggestedMax: last30DaysStatistics.reduce((acc, statistic) => 
    //             //     Math.max(statistic.routinesChecked.length, acc), 0), // max check routines * 2 to view it in the chart
    //             // todo add this bellow
    //             // suggestedMax : Math.max(unarchivedRoutines,
    //             //     last30DaysStatistics.reduce((acc, statistic) => 
    //             //     Math.max(statistic.routinesChecked.length, acc), 0)),
    //             ticks: {
    //                 stepSize: 1 // Set step size to 1 to display one by one
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'All routines',
    //             },
    //         },
    //     },
    // };

    // const data = {
    //     labels: last30DaysStatistics?.map(
    //         statistic => (isYesterday(statistic.day) ? 'yesterday' : 
    //         (isToday(statistic.day) ? 'today' : statistic.day))),
    //     datasets: [{
    //         label: 'Your accomplished routines',
    //         data: last30DaysStatistics?.map(statistic => statistic.routinesChecked.length),
    //         fill: false,
    //         borderColor: '#009245',
    //         },
    //         // todo add this chars too
    //         // {
    //         //     label: 'All unarchieved routines',
    //         //     data: last30DaysStatistics?.map(() => unarchivedRoutines),
    //         //     fill: true,
    //         //     backgroundColor: '#FDC8301F',
    //         //     borderColor: '#FDC830',
    //         //     hidden: true,
    //         // },
    //         // {
    //         //     label: 'Average checked routines',
    //         //     data: last30DaysStatistics?.map(() => average),
    //         //     fill: true,
    //         //     backgroundColor: '#43BEED1F',
    //         //     borderColor: '#43BEED',
    //         //     hidden: true,
    //         // },
    //     ]
    // };
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ];
    
      const config = {
        data : lineStatistics,
        height: 200,
        width: 400,

        xField: 'day',
        yField: 'checkedRoutines',
      };
    return (
        <Card loading={isLoading} className='h-72'>
            {
                lineStatistics?.length === 0 ? <h5>There is no statistics yet start checking routines</h5> : <Line {...config} />
            }
        </Card>
    )
}

export default StatisticLineWProg
