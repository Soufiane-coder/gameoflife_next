'use client'
import React, { useEffect, useState } from 'react';
// import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { PiLinkSimpleHorizontalBreakDuotone } from 'react-icons/pi';
import { useAppSelector } from '@/redux/hooks';
import RoutineType from '@/types/routine.type';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieStatistic = () => {
    const [spentedTime, setSpentedTime] = useState<Record<string, number> | null>(null)
    const { routines , loading, error } = useAppSelector((state) => state.routinesReducer) as {routines : RoutineType[],loading: boolean, error : string}

    useEffect(() => {
      if(!routines) return;

      ;(async () => {
          const req = await fetch('/api/firebase/spented-time-statistics');
          const data = await req.json()
          setSpentedTime(data)
      })()

    }, [routines])

    const data = {
      labels: routines?.map((routine) => `${routine.emoji} ${routine.title}`),
      datasets: [
        {
          label: '# of Votes',
          data: routines?.map((routine) => spentedTime ? spentedTime[routine.routineId as string] : 0), // when routineId not in spentedTime object it return undefined and Nan in chart
          backgroundColor: routines?.map((routine) => `${routine.bgEmojiColor}80`),
          borderColor: routines?.map((routine) => `${routine.bgEmojiColor}`),
          borderWidth: 1,
        },
      ],
    };

    return (
        <Card loading={!spentedTime} className='p-12'>
            {Object.keys(spentedTime || []).length !== 0 ? <Pie data={data} /> : <h5>There is no statistics yet start checking routines</h5> }
        </Card>
    )
}

export default PieStatistic