'use client'
import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';

const PieStatistic = () => {

    const [data, setData] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const req = await fetch('/api/firebase/spented-time-statistics');
            const data = await req.json()
            setData(data)
        })()
    }, [])

    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          text: (d: any) => `${d.type}\n ${d.value}`,
          position: 'spider',
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
      };

    //   if(!data) {
    //     return "loading..."
    //   }

    return (
        <Card loading={!data} className='p-12'>
            {data?.length !== 0 ? <Pie {...config} /> : null}
        </Card>
    )
}

export default PieStatistic