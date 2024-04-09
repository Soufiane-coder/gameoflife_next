import React, {useContext, useState} from 'react'
import { PiCheckBold } from "react-icons/pi";
import { MdMoreVert } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { Card, Button, Flex, Dropdown, Badge, Space, Spin } from 'antd'
import RoutineType from '@/types/routine.type'
import { PiArrowArcRightBold } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import Link from 'next/link';
import { UserType } from '@/types/user.type';
import CheckRoutinePopup from './check-routine-popup.component';
import { ContextHolderMessage, ContextHolderNotification } from '@/app/providers';
import { deleteRoutineFromFirebase } from '@/lib/firebase/routine.apis';
import { removeRoutine } from '@/redux/features/routinesSlice';
import { useAppDispatch } from '@/redux/hooks';

interface PopupsType {
  checkPopup: boolean,
}

const RoutineCard = ({routine, user} : {routine : RoutineType, user: UserType}) => {
  const init = {
    checkPopup: false
  }
  const [loading, setLoading] = useState<PopupsType>(init)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [popups, setPopups] = useState<PopupsType>(init)
  const notificationApi = useContext(ContextHolderNotification)
  const messageApi = useContext(ContextHolderMessage)
  const dispatch = useAppDispatch()

  const handleRemoveRoutine = async (routineId: string) => {
    setDeleteLoading(true);
		try{
      notificationApi.destroy()
			await fetch(`api/firebase/delete-routine?uid=${user.uid}&routineId=${routineId}`, {
        method: 'DELETE'
      })
      dispatch(removeRoutine(routineId as string))
			messageApi.open({
				type: 'success',
				content: 'Item deleted',
			})
		}
		catch(err){
			console.error(err)
			messageApi.open({
				type: 'error',
				content: 'Failed delete routine',
			})
		}
		finally{
			setDeleteLoading(false)
		}
  }

  const onRemove = () => {
    const { routineId } = routine
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
					onClick={() => handleRemoveRoutine(routineId as string)}
          >Delete this rouitne</Button>
			</Space>)

		notificationApi.warning({
			placement: 'top',
			message: 'Do you want to delete this routine',
			description: `${routine.title}: ${routine.description}`,
			duration: null,
			btn : btn,
		})
  }

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
        onClick={onRemove}
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
          <span className='absolute text-5xl top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 p-1 h-20 w-20 flex justify-center items-center rounded-md border  ' style={{backgroundColor: routine.bgEmojiColor}}>{deleteLoading ? <Spin/> : routine.emoji}</span>
          <Flex gap='small' vertical={true}>
            <h5 className='mt-4 text-2xl font-semibold'>{routine.title}</h5>
            <p>{routine.description}</p>
            <div className='flex justify-between p-1 border-b-2'>
              <span>{routine.combo !== 0 && `🔥${routine.combo}`}</span>
              <span>{routine.skip !== 0 && `⏭${routine.skip}`}</span>
              <span>🎚️{routine.level}</span>
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
