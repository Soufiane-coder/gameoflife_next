"use client"
import React from 'react'
import TimeRecorderPage from '@/components/time-recorder/time-recorder.component'
import {useAppSelector } from '@/redux/hooks'
import RoutineCard from '@/components/routine-card.component'
import RoutineType from '@/types/routine.type'
import Link from 'next/link'

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
    <div className='h-[90lvh] max-h-lvh flex justify-center items-center gap-7 flex-wrap'>
        <RoutineCard routine={selectedRoutine}/>
        <TimeRecorderPage routineId={params.routineId}/>
    </div>
  )
}

export default FocusMode
