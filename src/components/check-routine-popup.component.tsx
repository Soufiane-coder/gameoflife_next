import React, { useState } from 'react'
import { Modal, Input , Flex} from 'antd'
import { useAppDispatch } from '@/redux/hooks';
import { checkRoutine } from '@/redux/features/routinesSlice';
import RoutineType from '@/types/routine.type';
import { UserType } from '@/types/user.type';
import { addCoin } from '@/redux/features/userSlice';
interface PropsType {
    open: boolean;
    setOpen: (etat: boolean) => void;
    user: UserType;
    routine: RoutineType;
}

const CheckRoutinePopup = ({open, setOpen, user, routine} : PropsType) => {
    const [message, setMessage ] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onOk = () => {
        setLoading(true)
        const {routineId} = routine
        const {uid} = user;
        (async () => {
            try{ 
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
                console.log((await res.json()).message) 
                dispatch(checkRoutine(routineId as string))
                dispatch(addCoin())
            }catch(error: any){
                console.log(error, 'Try again later')
            }finally{
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
        onCancel={() => {setMessage('');setOpen(false)}}
        confirmLoading={loading}
        onOk={onOk}
    >

        <Flex gap='small' vertical={true}>
            <p> Write a message for future you to motivate, noting the progress or planing the next step</p>
            <Input value={message} onChange={(event) => setMessage(event.target.value)}/>
        </Flex>
    </Modal>
  )
}

export default CheckRoutinePopup
