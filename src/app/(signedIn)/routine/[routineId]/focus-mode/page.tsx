"use client"
import React from 'react'
import TimeRecorderPage from '@/components/time-recorder/time-recorder.component'
import {useAppSelector } from '@/redux/hooks'
import RoutineCard from '@/components/routine-card.component'
import Link from 'next/link'
import ToDoList from '@/components/todo-list/todo-list.component'

const FocusMode = ({params}: {params: {routineId: string}}) => {
  const {routines} = useAppSelector(state => state.routinesReducer)
  // we sure they will be the routine cause we tasted it in layout
  const selectedRoutine = routines?.find(routine => routine.routineId === params.routineId)

  if(!selectedRoutine){
    return (
      <h1>There is no routine with that Id, <Link href='/game-field'>Go back to game field</Link></h1>
    )
  }

  return (
    <div className='w-full grid grid-cols-[max-content] justify-center justify-items-center gap-7 lg:grid-cols-2'>
        <RoutineCard routine={selectedRoutine} className=''/>
        <ToDoList className='row-start-3 row-end-4 lg:w-10/12 w-full'/>
        <TimeRecorderPage routineId={params.routineId} className='row-start-2 row-end-3'/>
    </div>
  )
}

export default FocusMode
