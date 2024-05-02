'use client'
import React, {useEffect, useState} from 'react'
import dayjs, { Dayjs } from 'dayjs';
import PieSlice from './pie.slice.component';
import { Button, Flex, TimePicker, Space, Radio, Card} from 'antd';
import { UserType } from '@/types/user.type';
import { useAppSelector } from '@/redux/hooks';

function timeStringToSeconds(dayjs: Dayjs) {
    const currentTime = dayjs.format('HH:mm')
    const [hours, minutes] = currentTime.split(':').map(Number);

    // Calculate the total seconds
    const totalSeconds = hours * 3600 + minutes * 60;
    
    return totalSeconds;
}

function getAngleFromSeconds(totalSeconds : number, currentSecond: number) : number {
    const totalDegrees = totalSeconds * 360; // Total degrees based on total seconds
    const elapsedDegrees = (currentSecond * 360) / totalSeconds; // Degrees elapsed from the current second
    const angle = totalDegrees - elapsedDegrees; // Calculate the angle in degrees
  
    return angle % 360;
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


    return (
        <Card>
            <Flex className='time-recorder' vertical={true} align='stretch' gap='small'>
                <PieSlice 
                    radius={80}
                    startAngle={getAngleFromSeconds(totalSeconds, seconds) - 89.9}
                    endAngle={360 - 90}
                    fill="#1677ff" />
                {/* <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" /> */}

                {
                    !isActive ?
                    <TimePicker allowClear={false} showNow={false} needConfirm={false} defaultValue={dayjs(seconds * 1000)} format={'HH:mm'} onChange={handleChangeTime}/> :
                    <p>{dayjs(seconds * 1000).format('HH:mm:ss')}</p>
                }
                <Space>
                    {/* <Button onClick={handleStartStop}>{isActive ? 'Pause' : 'Start'}</Button> */}
                    <Button onClick={handleReset}>{isActive ? 'Reset' : 'Start'}</Button>
                </Space>
                {/* <Radio.Group 
                    options={options}
                    // onChange={onChange3}
                    value={options[0].value}
                    optionType="button" /> */}
                <Space><p>Total time: </p><span>{totalTimeSpented.toISOString().split('T')[1].split('.')[0]}</span></Space>
            </Flex>
        </Card>
    )
}

export default TimeRecorderPage
