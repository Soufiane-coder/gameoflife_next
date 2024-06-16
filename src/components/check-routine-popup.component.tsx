import React, { useEffect, useState } from 'react'
import { Modal, Input, Flex, Checkbox, Button } from 'antd'
import { useAppDispatch } from '@/redux/hooks';
import { checkRoutine } from '@/redux/features/routinesSlice';
import RoutineType, { GoalStatus, GoalType } from '@/types/routine.type';
import { UserType } from '@/types/user.type';
import { addCoin } from '@/redux/features/userSlice';
import Link from 'next/link';
interface PropsType {
    open: boolean;
    setOpen: (etat: boolean) => void;
    user: UserType;
    routine: RoutineType;
}

const CheckRoutinePopup = ({ open, setOpen, user, routine }: PropsType) => {
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [goal, setGoal] = useState<GoalType|undefined>(undefined)
    const [checkGoal, setCheckgoal] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            if(open){
                const res = await fetch(`/api/firebase/goals?uid=${user?.uid}&routineId=${routine.routineId}`)
                const goals = await res.json() as GoalType[]
                const selected = goals?.find((goal) => {
                    return goal.status == GoalStatus.WAITING && goal
                });
                setGoal(selected)
            }
        })()
    }, [open])

    const onOk = () => {
        setLoading(true)
        const { routineId } = routine
        const { uid } = user;
        (async () => {
            try {
                if(checkGoal){
                    await fetch('/api/firebase/check-goal', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            uid : user?.uid,
                            routineId,
                            goalId: goal?.goalId,
                        }),
                    })
                }
                const res = await fetch('/api/firebase/check-routine', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        routineId,
                        uid,
                        message,
                    }),
                })
                // console.log((await res.json()).message)
                dispatch(checkRoutine(routineId as string))
                dispatch(addCoin())
            } catch (error: any) {
                console.error(error, 'Try again later')
            } finally {
                setLoading(false)
                setMessage('')
                setOpen(false)
            }
        })()
    }
    return (
        <Modal
            open={open}
            title="Check Your routine for today"
            onCancel={() => { setMessage(''); setOpen(false) }}
            confirmLoading={loading}
            onOk={onOk}
        >
            <Flex gap='small' vertical={true}>
                <p> Write a message for future you to motivate, noting the progress or planing the next step</p>
                {
                    goal === undefined ? <p>Add goals <Link href={`/road-map/${routine.routineId}`} >here</Link></p> : <Checkbox checked={checkGoal} onChange={(event) => setCheckgoal(event?.target.checked)}>{goal?.label}</Checkbox>
                }
                <Input.TextArea placeholder={routine.message} value={message} onChange={(event) => setMessage(event.target.value)} />
            </Flex>
        </Modal>
    )
}

export default CheckRoutinePopup
