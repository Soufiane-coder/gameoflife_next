"use client"
import { useAppSelector } from '@/redux/hooks'
import { GoalStatus, GoalType } from '@/types/routine.type'
import { Card, Timeline, TimelineItemProps } from 'antd'
import { LiteralUnion } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import { PiPlusCircleBold } from "react-icons/pi";

const RoadPath = ({routineId} : {routineId: string}) => {

    const { user } = useAppSelector((state) => state.userReducer)
    const [goals, setGoals] = useState<GoalType[] | null>(null)

    useEffect(() => {
        if(!goals){
            (async () => {
                try{
                    const res = await fetch(`/api/firebase/goals?uid=${user?.uid}&routineId=${routineId}`)
                    const res_goals = await res.json() as GoalType[]
                    setGoals(res_goals)
                }catch(error){
                    console.error(error)
                }
            })()
        }
    }, [goals])

    if(!goals){
        return (<h1>loading goals ...</h1>)
    }
    const statusMap : Record<GoalStatus, LiteralUnion<'green' | 'gray' | 'cyan'>> = {
            DONE : 'green',
            WAITING : 'gray',
            SKIPPED : 'cyan',
    }

    const firstGoalWaiting = goals?.find((goal) => {
        return goal.status == GoalStatus.WAITING && goal
    })

    return (
        <Card className='w-96 h-full'>
            <Timeline
                mode='left'
                reverse={true}
                items={
                    goals.map((goal) : TimelineItemProps  => {
                    
                        return {
                            label: <h1 className={`capitalize ${goal.goalId === firstGoalWaiting?.goalId && 'font-bold'}`}>{goal.label}</h1>,
                            color: goal.goalId === firstGoalWaiting?.goalId ? 'black' : statusMap[goal.status],
                            children: <p className='capitalize'>{goal.description}</p>
                        }
                    }).concat([{dot : <PiPlusCircleBold className='cursor-pointer text-xl'/>,label: <h1 className='capitalize'>Add Routine</h1>, color : 'pink', children: <></>, pending: true}])
                }
            />
            {
                goals.length === 0 && <p>There is no routine</p>
            }
        </Card>
    )
}

export default RoadPath
