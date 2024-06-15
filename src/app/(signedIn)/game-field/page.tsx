'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useGetRoutinesQuery, useGetUserQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type'
import { Button, Select } from 'antd'
import AddRoutineModal from '@/components/add-routine-modal/add-routine-modal.component'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchRoutines, setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import RoutineCard from '@/components/routine-card.component'
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCategoryModal from '@/components/add-category-modal.component'
import RoutineLoading from '@/components/routine-loading.component'
import { selectFilterOptions } from './utils'

const GameField = () => {

  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const { routines, loading, error } = useAppSelector((state) => state.routinesReducer)
  const [openAddRoutine, setOpenAddRoutine] = useState<boolean>(false)
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)

  if(error != ''){
    throw new Error(error)
  }

  useEffect(() => {
    if (user && !routines) { 
      // the !routines is in the case that routines array is already loaded to no re-fetch
      dispatch(fetchRoutines({ uid: user.uid, lastVisit: user.lastVisit }))
    }
  }, [user, dispatch])

  if (loading || !routines) {
    return (
      <>
        <div className='min-h-20'></div>
        <div className='grid justify-center justify-items-center grid-cols-grid-routine-card-cols'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, key) => (<React.Fragment key={key}><RoutineLoading /></React.Fragment>))
          }
        </div>
      </>)
  }


  return (
    <div>
      <div>
        <Select
					options={selectFilterOptions}
					defaultValue={selectFilterOptions[selectFilterOptions.length - 1]}
					placeholder="select attribute..."
					style={{minWidth: '15rem'}}
					// onChange={setSelectedFilterOption}
				/>
      </div>
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
      <div className='grid justify-center justify-items-center gap-5 grid-cols-grid-routine-card-cols'>
        {
          routines?.length === 0 ?
            <h5>There is no routines add Routine</h5>
            :
            routines?.map((routine, key) => (
              <React.Fragment key={key}>
                <RoutineCard routine={routine} />
              </React.Fragment>))
        }
      </div>
    </div>
  )
}



export default GameField
