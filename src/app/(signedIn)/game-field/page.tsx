'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useGetRoutinesQuery, useGetUserQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type'
import { Button } from 'antd'
import AddRoutineModal from '@/components/add-routine-modal/add-routine-modal.component'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchRoutines, setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import RoutineCard from '@/components/routine-card.component'
import { Timestamp } from 'firebase/firestore'
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCategoryModal from '@/components/add-category-modal.component'
import RoutineLoading from '@/components/routine-loading.component'

const GameField = () => {
  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const { routines, loading, error } = useAppSelector((state) => state.routinesReducer)
  const [openAddRoutine, setOpenAddRoutine] = useState<boolean>(false)
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      dispatch(fetchRoutines({ uid: user.uid, lastVisit: user.lastVisit }))
    }
  }, [user, dispatch])

  if (loading || !routines) {
    return (
      <>
        <div className='min-h-20'></div>
        <div className='grid justify-center justify-items-center grid-cols-grid-routine-card-cols'>
          {
            [5, 6, 7, 8,].map((_, key) => (<React.Fragment key={key}><RoutineLoading /></React.Fragment>))
          }
        </div>
      </>)
  }
  return (
    <div>
      <div className='min-h-20'>
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
          setOpen={setOpenAddRoutine} />
      </div>
      <div className='grid justify-center justify-items-center grid-cols-grid-routine-card-cols'>
        {
          routines.length === 0 ?
            <h5>There is no routines add Routine</h5>
            :
            routines.map((routine, key) => (
              <React.Fragment key={key}>
                <RoutineCard user={user as UserType} routine={routine} />
              </React.Fragment>))
        }
      </div>
    </div>
  )
}



export default GameField
