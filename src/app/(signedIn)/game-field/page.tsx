'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useGetRoutinesQuery, useGetUserQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type'
import { Button } from 'antd'
import AddRoutineModal from '@/components/add-routine-modal.component'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import RoutineCard from '@/components/routine-card.component'


const GameField = () => {

  const {data: session} = useSession()
  const {data: user} = useGetUserQuery({user: session?.user})
  const [openAddRoutine, setOpenAddRoutine] = useState<boolean>(false)
  const reduxRoutines = useAppSelector((state) => state.routines)

  return (
    <div>
      <div>
        <Button
          type='primary'
          onClick={() => setOpenAddRoutine(true)}>
          Add routine
        </Button>
        <AddRoutineModal {...{
          open: openAddRoutine, 
          user,
          setOpen: setOpenAddRoutine}}/>
      </div>
      {
        reduxRoutines?.map((routine, key) => (<RoutineCard routine={routine} key={key}/>))
      }
    </div>
  )
}

export default GameField
