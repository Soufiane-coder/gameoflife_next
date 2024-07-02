'use client'
import React, { useEffect, useState } from 'react'
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
import { filterRoutines, selectFilterOptions, daysSchedule } from './utils'
import { FilterValuesType } from '@/types/general.type'
import dayjs from 'dayjs'

const GameField = () => {

  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const { routines, loading, error } = useAppSelector((state) => state.routinesReducer)
  const [openAddRoutine, setOpenAddRoutine] = useState<boolean>(false)
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)

  const [selectedFilterValue, setSelectedFilterValue] = useState<FilterValuesType>(FilterValuesType.UNARCHIVED);
  const [selectedRoutines, setSelectedRoutines] = useState<RoutineType[] | null>(null)

  const [selectedDays , setSelectedDays] = useState([daysSchedule[dayjs().day()].value])

  if(error != ''){
    throw new Error(error)
  }

  useEffect(() => {
    if(routines){
      setSelectedRoutines(filterRoutines(routines, selectedFilterValue, selectedDays))
    }
  }, [selectedFilterValue, routines, selectedDays])

  if (loading || !routines || !selectedRoutines) {
    return (
      <>
      <div className='min-h-14 my-2 flex items-center flex-wrap gap-x-5 gap-y-2'>
        <Select
					defaultValue={FilterValuesType.UNARCHIVED}
					placeholder="select attribute..."
					style={{minWidth: '15rem'}}
				/>
        <Select
					options={daysSchedule}
					defaultValue={daysSchedule[dayjs().day()] as any}
					placeholder="select attribute..."
					style={{minWidth: '15rem'}}
          mode='tags'
					maxTagCount='responsive'
				/>
      </div>
      <div className='flex gap-3'>
        <Button
          className='mt-auto'
          color='cyan'
          type='primary'>
          Add Category
        </Button>
        <Button
          className='mt-auto'
          type='primary'>
          Add routine
        </Button>
      </div>
        <div className='grid justify-center justify-items-center grid-cols-grid-routine-card-cols'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, key) => (<React.Fragment key={key}><RoutineLoading /></React.Fragment>))
          }
        </div>
      </>)
  }


  return (
    <div>
      <div className='min-h-14 my-2 flex items-center flex-wrap gap-x-5 gap-y-2'>
        <Select
					options={selectFilterOptions}
					defaultValue={FilterValuesType.UNARCHIVED}
					placeholder="select attribute..."
					style={{minWidth: '15rem'}}
					onChange={setSelectedFilterValue}
				/>
        <Select
					options={daysSchedule}
					defaultValue={daysSchedule[dayjs().day()] as any}
					placeholder="select attribute..."
					style={{minWidth: '15rem'}}
          mode='tags'
					maxTagCount='responsive'
					onChange={setSelectedDays}
				/>
      </div>
      <div className='flex gap-3'>
        <Button
          className='mt-auto'
          color='cyan'
          type='primary'
          onClick={() => setOpenAddCategory(true)}>
          Add Category
        </Button>
        <Button
          className='mt-auto'
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
          routines?.length === 0 ? <h5>There is no routines add routine</h5> : // to indicate that there is no routine at all
           ( selectedRoutines?.length === 0 ? (<h5>There is no {selectedFilterValue} routines</h5>) : // to indicate that there is no routine with that crieteria
            selectedRoutines?.map((routine, key) => (
              <React.Fragment key={key}>
                <RoutineCard routine={routine} />
              </React.Fragment>)))
        }
      </div>
    </div>
  )
}



export default GameField
