'use client'
import React, {useEffect, useMemo, useState} from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { Button, Flex, TimePicker, Space, Radio, Card} from 'antd';
import { useAppSelector } from '@/redux/hooks';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("Etc/GMT");


function timeStringToSeconds(dayjs: Dayjs) {
    const currentTime = dayjs.format('HH:mm')
    const [hours, minutes] = currentTime.split(':').map(Number);

    // Calculate the total seconds
    const totalSeconds = hours * 3600 + minutes * 60;
    
    return totalSeconds;
}

  

const TimeRecorderPage : React.FC<{routineId: string, className ?: string}> = ({routineId, className = ''}) => {
    const [ totalTimeSpented, setTotalTimeSpented ] = useState<Dayjs>(dayjs(0).tz("Etc/GMT"))

    const [ totalSeconds, setTotalSeconds] = useState<number>(20*60) // 20*60*1000 = 20min // stayed fix
    const [ seconds, setSeconds ] = useState<number>(20*60) // change after time
    const [ isActive, setIsActive ] = useState<boolean>(false)
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        }

        if (seconds <= 0) {
            setIsActive(false)
        }
        //  else if (!isActive && seconds !== 0) {
        //     clearInterval(interval);
        // }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
        (async () => {
            if (!isActive){
                const req = await fetch('/api/firebase/add-spented-time', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        uid: user?.uid,
                        routineId,
                        spentedTime: dayjs(
                            (totalSeconds - seconds) * 1000
                        ).tz("Etc/GMT")
                    })
                })
                const timeSpented = await req.json()
                setTotalTimeSpented(dayjs(timeSpented).tz("Etc/GMT"))
            }
            setSeconds(totalSeconds);
        }
        )()
    }, [isActive])

    // const handleStartStop = () : void => {
    //     setIsActive(!isActive);
    // };
    
    const handleReset = () : void => {
        setIsActive(!isActive);
    };

    const handleChangeTime = (time : Dayjs) : void => {
        setTotalSeconds(timeStringToSeconds(time))
        setSeconds(timeStringToSeconds(time));
    }


    const data = useMemo(() => {
        return  {
            labels: ['Time spented', 'Time left'],
            datasets: [
              {
                label: 'Percentage',
                data: [((totalSeconds-seconds) * 100)/totalSeconds, (seconds/totalSeconds) * 100],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(200, 200, 200, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(200, 200, 200, 1)',
                ],
                borderWidth: 1,
                cutout: '90%',
              },
            ],
        };
    }, [seconds])
    
    const options = {
        animation:{
            duration: 1000,
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return (
        <div className={`${className}`}>
            <Card>
                <Flex className='time-recorder' vertical={true} align='stretch' gap='small'>
                    <Doughnut data={data} options={options}/>

                    {
                        !isActive ?
                        <TimePicker allowClear={false} showNow={false} needConfirm={false} defaultValue={dayjs(totalSeconds * 1000)} format={'HH:mm'} onChange={handleChangeTime}/>  :
                        <p>{dayjs(seconds * 1000).tz("Etc/GMT").format('HH:mm:ss')}</p>
                    }
                    <Space>
                        {/* <Button onClick={handleStartStop}>{isActive ? 'Pause' : 'Start'}</Button> */}
                        <Button onClick={handleReset}>{isActive ? 'Reset' : 'Start'}</Button>
                    </Space>
                    
                    <Space><p>Total time: </p><span>{totalTimeSpented.toISOString().split('T')[1].split('.')[0]}</span></Space>
                </Flex>
            </Card>
        </div>
    )
}

export default TimeRecorderPage
