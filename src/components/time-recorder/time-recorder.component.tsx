'use client'
import React, {useEffect, useMemo, useState} from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { Button, Flex, TimePicker, Space, Radio, Card} from 'antd';
import { useAppSelector } from '@/redux/hooks';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function timeStringToSeconds(dayjs: Dayjs) {
    const currentTime = dayjs.format('HH:mm')
    const [hours, minutes] = currentTime.split(':').map(Number);

    // Calculate the total seconds
    const totalSeconds = hours * 3600 + minutes * 60;
    
    return totalSeconds;
}

  

const TimeRecorderPage : React.FC<{routineId: string}> = ({routineId}) => {
    const [ totalTimeSpented, setTotalTimeSpented ] = useState<Dayjs>(dayjs(0))
    const [ totalSeconds, setTotalSeconds] = useState<number>(timeStringToSeconds(dayjs('00:20', 'HH:mm')))
    const [ seconds, setSeconds ] = useState<number>(timeStringToSeconds(dayjs('00:20', 'HH:mm')))
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
                        )
                    })
                })
                const timeSpented = await req.json()
                setTotalTimeSpented(dayjs(timeSpented))
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

    // useEffect(() => {
    //     console.log((seconds/totalSeconds) * 100); // time left
    //     console.log(((totalSeconds-seconds) * 100)/totalSeconds) // time passes
    // },[seconds])

    // const data = {
    //     labels: ['Time spented', 'Time left'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [5, 10],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //         ],
    //         borderWidth: 1,
    //         cutout: '90%',
    //       },
    //     ],
    //   };

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
        <Card>
            <Flex className='time-recorder' vertical={true} align='stretch' gap='small'>
                <Doughnut data={data} options={options}/>;

                {
                    !isActive ?
                    <TimePicker allowClear={false} showNow={false} needConfirm={false} defaultValue={dayjs(seconds * 1000)} format={'HH:mm'} onChange={handleChangeTime}/> :
                    <p>{dayjs(seconds * 1000).format('HH:mm:ss')}</p>
                }
                <Space>
                    {/* <Button onClick={handleStartStop}>{isActive ? 'Pause' : 'Start'}</Button> */}
                    <Button onClick={handleReset}>{isActive ? 'Reset' : 'Start'}</Button>
                </Space>
                
                <Space><p>Total time: </p><span>{totalTimeSpented.toISOString().split('T')[1].split('.')[0]}</span></Space>
            </Flex>
        </Card>
    )
}

export default TimeRecorderPage
