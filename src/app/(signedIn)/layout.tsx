'use client'
import React, { Suspense, useEffect , useState} from 'react'
import UserBar from '@/components/user-bar.component';
import { getSession, useSession } from 'next-auth/react'
import { useGetUserQuery, useGetRoutinesQuery } from '@/redux/services/apiSlice'
import { UserType } from '@/types/user.type';
import { setRoutines } from '@/redux/features/routinesSlice'
import RoutineType from '@/types/routine.type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUser } from '@/redux/features/userSlice';

const SignedInLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {

    const {data: session, status} = useSession()
    const dispatch = useAppDispatch()
    let { user , loading, error} = useAppSelector((state) => state.userReducer)

    useEffect(() => {
        if((session?.user as any)?.id){
            dispatch(fetchUser((session?.user as any).id as string))
        }
    }, [session, dispatch])


    // const {data: user, isLoading: isUserLoading} = useGetUserQuery({user : session?.user})
    // const {data: initRoutines, isLoading : isRoutinesLoading,} = useGetRoutinesQuery({ uid: user?.uid, lastVisit: user?.lastVisit})
  
    // useEffect(() => {
    //     if(initRoutines){
    //       dispatch(setRoutines(initRoutines as RoutineType[]))
    //     }
    //   }, [initRoutines, dispatch])
    

    if (status === 'loading' || loading || !user){
        return (<h1>Loading user...</h1>)
    }
    return (
        <main className='p-2 md:pr-20'>
            <UserBar user={user as UserType}/>
            {children}
        </main>
    )
}

export default SignedInLayout
