"use client"
import { useAppSelector } from '@/redux/hooks'
import { GoalStatus, GoalType } from '@/types/routine.type'
import { Card, Timeline, TimelineItemProps,  Popconfirm, Space, Button } from 'antd'
import { LiteralUnion } from 'next-auth/react'
import React, { useEffect, useMemo, useState, useContext } from 'react'
import { PiPlusCircleBold } from "react-icons/pi";
import AddGoalModal from './add-goal-modal.component'
import { MdDeleteOutline } from "react-icons/md";
import { ContextHolderNotification } from '@/app/providers'


const RoadPath = ({routineId} : {routineId: string}) => {
    const notificationApi = useContext(ContextHolderNotification)
    const { user } = useAppSelector((state) => state.userReducer)
    const [goals, setGoals] = useState<GoalType[] | null>(null)
    const [goalModal, setGoalModal] = useState<boolean>(false)
    const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null)

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
        // This condition to select the firt waiting goal after deleting the selected goal
        else{
            const selected = goals?.find((goal) => {
                return goal.status == GoalStatus.WAITING && goal
            }) as GoalType;
            setSelectedGoal(selected)
        }
    }, [goals])

    if(!goals){
        return (<Card className='w-96 min-h-full' loading={true}></Card>)
    }
    const statusMap : Record<GoalStatus, LiteralUnion<'green' | 'gray' | 'cyan'>> = {
            DONE : 'green',
            WAITING : 'gray',
            SKIPPED : 'cyan',
    }

    const handleRemoveGoal = async () => {
        try{
            notificationApi.destroy()
            await fetch(`/api/firebase/delete-goal?uid=${user?.uid}&routineId=${routineId}&goalId=${selectedGoal?.goalId}`, {
                method: 'DELETE'
            })
            setGoals((old) => (old ?? []).filter((goal) => goal.goalId !== selectedGoal?.goalId))
            
        } catch(err){
            console.error(err)
        }
    }

    const onDelete = () => {
        const btn = (
			<Space>
				<Button 
					type='default'
					// type='button'
					onClick={() => {notificationApi.destroy();}}
					>Cancel</Button>
				<Button
					type='primary'
					// thmlType='submit'
					color='red'
					// loading={deleteLoading} // not working cause not re-rendering
					onClick={() => handleRemoveGoal()}
          >Delete this rouitne</Button>
			</Space>)
        notificationApi.warning({
			placement: 'top',
			message: 'Do you want to delete this routine',
			description: `${selectedGoal?.label}: ${selectedGoal?.description}`,
			duration: null,
			btn : btn,
		})
    }

    const handleAddGoal = () => {
        setGoalModal(true)
    }
    return (
        <>
            <Card
                className='w-96 max-h-[92rem]'
                title='Your path road'
                actions={[
                    <MdDeleteOutline onClick={onDelete} key='delete' className='h-6 w-6 m-auto' />,
                    // <EditOutlined key="edit" />,
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                // extra={<a href="#">More</a>}
                >
                <Timeline
                    mode='left'
                    reverse={true}
                    items={
                        goals.map((goal) : TimelineItemProps  => {
                            return {
                                label: <h1 onClick={() => setSelectedGoal(goal)} className={`capitalize cursor-pointer ${goal.goalId === selectedGoal?.goalId && 'font-bold'}`}>{goal.label}</h1>,
                                color: goal.goalId === selectedGoal?.goalId ? 'black' : statusMap[goal.status],
                                children: <p className='capitalize'>{goal.description}</p>
                            }
                        }).concat([{dot : <PiPlusCircleBold className='cursor-pointer text-xl' onClick={handleAddGoal}/>,label: <h1 className='capitalize'>Add Routine</h1>, color : 'pink', children: <></>, pending: true}])
                    }
                />
                {
                    goals.length === 0 && <p>There is no routine</p>
                }
            </Card>
            <AddGoalModal
                open={goalModal}
                setOpen={setGoalModal}
                setGoals={setGoals}
                routineId={routineId}
                uid={user?.uid as string}/>
        </>
    )
}

export default RoadPath
