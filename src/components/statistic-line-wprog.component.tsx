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


    
      const config = {
        data : lineStatistics,
        height: 200,
        width: 400,

        xField: 'day',
        yField: 'checkedRoutines',
      };
    return (
        <Card loading={!lineStatistics} className='h-72'>
            {
                // lineStatistics?.length === 0 ? <h5>There is no statistics yet start checking routines</h5> : <Line {...config} />
            }
        </Card>
    )
}

export default StatisticLineWProg
