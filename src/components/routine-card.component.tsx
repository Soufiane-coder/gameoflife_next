import React, {useState} from 'react'
import { PiCheckBold } from "react-icons/pi";
import { MdMoreVert } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { Card, Button, Flex, Dropdown, Badge } from 'antd'
import RoutineType from '@/types/routine.type'
import { PiArrowArcRightBold } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import Link from 'next/link';
import { GoalDartIcon } from '../../public/icons';
import { checkRoutine } from '@/redux/features/routinesSlice';
import { UserType } from '@/types/user.type';
import { useAppDispatch } from '@/redux/hooks';

const RoutineCard = ({routine, user} : {routine : RoutineType, user: UserType}) => {
  const [checkLoading, setCheckLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()

	const menuItems = [
		{
			key: '1',
			label: (
			<a onClick={async (event) => {
				event.preventDefault();
				// await setArchivedOptionInFirebase(user.uid, routine.routineId, !routine.isArchived)
				// setArchivedOption(routine.routineId, !routine.isArchived)
			}}>
				{routine.isArchived ? "Desarchive" : "Archive"}
			</a>
			),
		},
		{
			key: '2',
			label: (
			<a 
        // onClick={handleEditRoutine}
        >
				Edit
			</a>
			),
		},
		{
			key: '3',
			label: (
        <Link  href={'/focus-mode/' + routine.routineId}>
          Focus mode
        </Link>
			),
		},
		{
			key: '4',
			label: (
			<a  
        // onClick={handleRemove}
        >
				Delete
			</a>
			),
		},
	];

  const colorMap = {
		'important': 'red',
		'medium' : 'volcano',
		'low' : 'cyan',
 }

  const onCheck = async () => {
    setCheckLoading(true)
    const {routineId} = routine
    const {uid} = user
    try{
      await fetch('/api/firebase/check-routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          routineId,
          uid,
          message: ''
        }),
      })
      dispatch(checkRoutine(routineId as string))
    }catch(error: any){
      console.log(error, 'Try again later')
    }finally{
      setCheckLoading(false)
    }
  }

  return (
    <div className='w-[22rem] h-52 mt-12'>
      <Badge.Ribbon
        text={routine.priority.charAt(0).toUpperCase() + routine.priority.slice(1)}
        color={colorMap[routine.priority]}
      >
        <Card className='w-[22rem] h-52'>
          <span className='absolute text-5xl top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 p-1 h-20 w-20 flex justify-center items-center rounded-md border  ' style={{backgroundColor: routine.bgEmojiColor}}>{routine.emoji}</span>
          <Flex gap='small' vertical={true}>
            <h5 className='mt-4 text-2xl font-semibold'>{routine.title}</h5>
            <p>{routine.description}</p>
            <div className='flex justify-between p-2 border-b-2'>
              <span></span>
              <span></span>
              <span>🎚️</span>
            </div>
            <div className='flex justify-between'>
              <Button
                loading={checkLoading}
                icon={<PiCheckBold/>}
                className='min-h-10 min-w-10 p-0'
                onClick={onCheck}
                disabled={routine.isSubmitted}
                type='primary'/>
              <Button
                color='cyan'
                icon={< PiArrowArcRightBold/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>
              <Button
                color='orange'
                icon={<TbMessage/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>
              <Button
                color='rose'
                icon={<GoGoal/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>
      
              <Dropdown menu={{items: menuItems}} placement="top">
                  <Button
                    type="text"
                    className="min-h-10 max-w-3"
                    icon={<MdMoreVert/>}
                    />
              </Dropdown>
            </div>
          </Flex>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}

export default RoutineCard
