"use client"
import React from 'react'
import TimeRecorderPage from '@/components/time-recorder/time-recorder.component'
import {useAppSelector } from '@/redux/hooks'
import RoutineCard from '@/components/routine-card.component'
import RoutineType from '@/types/routine.type'

const FocusMode = ({params}: {params: {routineId: string}}) => {
  const {routines} = useAppSelector(state => state.routinesReducer)
  // we sure they will be the routine cause we tasted it in layout
  const selectedRoutine = routines?.find(routine => routine.routineId === params.routineId) as RoutineType

  return (
    <div className='h-[90lvh] max-h-lvh flex justify-center items-center gap-7 flex-wrap'>
        <RoutineCard routine={selectedRoutine}/>
        <TimeRecorderPage routineId={params.routineId}/>
    </div>
  )
}

export default FocusMode
