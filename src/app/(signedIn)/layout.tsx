'use client'
import React, { useEffect , useState} from 'react'
import UserBar from '@/components/user-bar.component';
import { getSession, useSession } from 'next-auth/react'
import { useGetUserQuery, useGetRoutinesQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type';
import { setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const SignedInLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const {data: session, status} = useSession()
    const {data: user, isLoading: isUserLoading} = useGetUserQuery({user : session?.user})
    const {data: initRoutines, isLoading : isRoutinesLoading,} = useGetRoutinesQuery({ uid: user?.uid})
    const dispatch = useAppDispatch()
  
    useEffect(() => {
        if(initRoutines){
          dispatch(setRoutines(initRoutines as RoutineType[]))
        }
      }, [initRoutines])
    
    if (status === 'loading' || isUserLoading === true || Object.keys(user).length === 0){
        return (<h1>Loading...</h1>)
    }
   
    return (
        <main className='p-2'>
            <UserBar user={user}/>
            {isRoutinesLoading ? <h1>Loading Routines ...</h1> : children}
        </main>
    )
}

export default SignedInLayout
