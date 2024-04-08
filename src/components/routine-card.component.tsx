import React, {useState} from 'react'
import { PiCheckBold } from "react-icons/pi";
import { MdMoreVert } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { Card, Button, Flex, Dropdown, Badge } from 'antd'
import RoutineType from '@/types/routine.type'
import { PiArrowArcRightBold } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import Link from 'next/link';
import { UserType } from '@/types/user.type';
import CheckRoutinePopup from './check-routine-popup.component';

interface PopupsType {
  checkPopup: boolean,
}

const RoutineCard = ({routine, user} : {routine : RoutineType, user: UserType}) => {
  const init = {
    checkPopup: false
  }
  const [loading, setLoading] = useState<PopupsType>(init)
  const [popups, setPopups] = useState<PopupsType>(init)


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
    setPopups(old => ({...old, checkPopup: true}))

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
                loading={loading.checkPopup}
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
      <CheckRoutinePopup
        user={user}
        routine={routine}
        loading={loading.checkPopup}
        setLoading={(etat: boolean) => setLoading(old => ({...old, checkPopup: etat}))}
        open={popups.checkPopup}
        setOpen={(etat: boolean) => setPopups(old => ({...old, checkPopup: etat}))}/>
    </div>
  )
}

export default RoutineCard
