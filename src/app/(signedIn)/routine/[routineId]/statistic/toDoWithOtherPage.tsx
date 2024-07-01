"use client"
import { useAppSelector } from '@/redux/hooks'
import { Badge, BadgeProps, Calendar, CalendarProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
// const getListData = (value: Dayjs) => {
//     let listData: { type: string; content: string }[] = []; // Specify the type of listData
//     switch (value.date()) {
//       case 8:
//         listData = [
//           { type: 'warning', content: 'This is warning event.' },
//           { type: 'success', content: 'This is usual event.' },
//         ];
//         break;
//       case 10:
//         listData = [
//           { type: 'warning', content: 'This is warning event.' },
//           { type: 'success', content: 'This is usual event.' },
//           { type: 'error', content: 'This is error event.' },
//         ];
//         break;
//       case 15:
//         listData = [
//           { type: 'warning', content: 'This is warning event' },
//           { type: 'success', content: 'This is very long usual event......' },
//           { type: 'error', content: 'This is error event 1.' },
//           { type: 'error', content: 'This is error event 2.' },
//           { type: 'error', content: 'This is error event 3.' },
//           { type: 'error', content: 'This is error event 4.' },
//         ];
//         break;
//       default:
//     }
//     return listData || [];
//   };
  
//   const getMonthData = (value: Dayjs) => {
//     if (value.month() === 8) {
//       return 1394;
//     }
//   };

const StatisticRout = ({params}: {params: {routineId : string}}) => {
    const {routineId} = params
    const {user} = useAppSelector(state => state.userReducer)
    const {routines} = useAppSelector(state => state.routinesReducer)
    const [selectedDay, setSelectedDay] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [spentedTime, setSpentedTime] = useState<Dayjs>(dayjs(0))

    useEffect(() => {
        ;(async () =>{
            try{
                const res  = await fetch(`/api/firebase/statistic/get-spentedTime-routine?routineId=${routineId}&day=${selectedDay}`)
                const data = await res.json()
                setSpentedTime(dayjs(data))
            }catch(error){
                console.error(error)
            }
        })()
    }, [selectedDay])

    // const monthCellRender = (value: Dayjs) => {
    //     const num = getMonthData(value);
    //     return num ? (
    //       <div className="notes-month">
    //         <section>{num}</section>
    //         <span>Backlog number</span>
    //       </div>
    //     ) : null;
    //   };
    
    //   const dateCellRender = (value: Dayjs) => {
    //     const listData = getListData(value);
    //     return (
    //       <ul className="events ">
    //         {listData.map((item) => (
    //           <li key={item.content} className='text-sm'>
    //             <Badge status={item.type as BadgeProps['status']} text={item.content} size='small'/>
    //           </li>
    //         ))}
    //       </ul>
    //     );
    //   };
    
    //   const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    //     if (info.type === 'date') return dateCellRender(current);
    //     if (info.type === 'month') return monthCellRender(current);
    //     return info.originNode;
    //   };

      const handleCalendarChange = (value: Dayjs) => {
        setSelectedDay(value.format('YYYY-MM-DD'))
      }

    return (
        <div className='flex flex-wrap h-96'>
            <Calendar 
                disabledDate={(date) => date > dayjs()}
                onChange={handleCalendarChange}
                fullscreen={false}
                className='w-1/2 h-full'
                // cellRender={cellRender} 
            />
            <div className='w-1/2'>
                <h1 className='h1'>{spentedTime.format('H')} hour</h1>
                <h1 className='h1'>{spentedTime.format('m')} minute</h1>
                <h1 className='h1'>{spentedTime.format('s')} second</h1>
            </div>
        </div>
    )
}

export default StatisticRout