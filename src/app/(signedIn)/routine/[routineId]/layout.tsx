'use client'
import React, {useEffect} from 'react'
import { fetchRoutines, setRoutines } from '@/redux/features/routinesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';

const RoutineLayout = ({ children, params }: Readonly<{
    children: React.ReactNode;
    params: {routineId: string}
}>) => {
    const {user} = useAppSelector(state => state.userReducer)
    const {routines, loading, error} = useAppSelector(state => state.routinesReducer)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      if (user && !routines) {
        dispatch(fetchRoutines({ uid: user.uid, lastVisit: user.lastVisit }))
      }
    }, [dispatch])
  
    if(loading || !routines){
      return <h1>loading...</h1>
    }

    const selectedRoutine = routines?.find(routine => routine.routineId === params.routineId);
    
    if(!selectedRoutine) {
      return <h1>There is no routine with that Id, <Link href='/game-field'>Go back to game field</Link></h1>
    }
  
    return children
}

export default RoutineLayout
