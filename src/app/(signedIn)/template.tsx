'use client'
import { fetchUser } from '@/redux/features/userSlice'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, { useEffect } from 'react'
import { fetchRoutines } from '@/redux/features/routinesSlice';

const TemplateSignedIn: React.FC<any> = ({children}) => {

    const {data: session, status} = useSession()
    const { user } = useAppSelector((state) => state.userReducer)
    const { routines, loading, error } = useAppSelector((state) => state.routinesReducer)
    const dispatch = useAppDispatch()    
    useEffect(() => {
        if((session?.user as any)?.uid){
            dispatch(fetchUser((session?.user as any).uid as string))
        }
    }, [session, dispatch])
    
  useEffect(() => {
    if (user && !routines) { 
      // the !routines is in the case that routines array is already loaded to no re-fetch
      dispatch(fetchRoutines({ uid: user.uid, lastVisit: user.lastVisit }))
    }
  }, [user, dispatch])

    return (
        <div>
            {children} 
        </div>
    )
}

export default TemplateSignedIn