'use client'
import React, { Suspense, useEffect , useState} from 'react'
import UserBar from '@/components/user-bar.component';
import { getSession, useSession } from 'next-auth/react'
import { useGetUserQuery, useGetRoutinesQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type';
import { fetchRoutines, setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUser } from '@/redux/features/userSlice';
import UserLoader from '@/components/user-loader/user-loader.layout';

const routineLayout = ({ children, params }: Readonly<{
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
    const selectedRoutine = routines?.find(routine => routine.routineId === params.routineId)
    if(!selectedRoutine) {
      return <h1>There is no such routine!</h1>
    }
  
    return children
}

export default routineLayout
