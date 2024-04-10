'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useGetRoutinesQuery, useGetUserQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type'
import { Button } from 'antd'
import AddRoutineModal from '@/components/add-routine-modal/add-routine-modal.component'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import RoutineCard from '@/components/routine-card.component'
import { Timestamp } from 'firebase/firestore'
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCategoryModal from '@/components/add-category-modal.component'

const GameField = () => {

  const {data: session} = useSession()
  const {data: user} = useGetUserQuery({user: session?.user})
  const [openAddRoutine, setOpenAddRoutine] = useState<boolean>(false)
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)
  const reduxRoutines = useAppSelector((state) => state.routines)
  return (
    <div>
      <div>
        <Button
          color='cyan'
          type='primary'
          onClick={() => setOpenAddCategory(true)}>
          Add Category
        </Button>
        <Button
          type='primary'
          onClick={() => setOpenAddRoutine(true)}>
          Add routine
        </Button>
        <AddCategoryModal
          open={openAddCategory}
          user={user as UserType}
          setOpen={setOpenAddCategory}
        />
        <AddRoutineModal
          open={openAddRoutine}
          user={user as UserType}
          setOpen={setOpenAddRoutine}/>
      </div>
      <div className='grid justify-center justify-items-center grid-cols-grid-routine-card-cols'>
        {
          reduxRoutines?.length === 0 ? 
            <h5>There is no routines add Routine</h5>
          :
          reduxRoutines?.map((routine, key) => (<RoutineCard user={user} routine={routine} key={key}/>))
        }
      </div>
    </div>
  )
}



export default GameField
