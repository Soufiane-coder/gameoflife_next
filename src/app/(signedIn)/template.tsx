'use client'
import { fetchUser } from '@/redux/features/userSlice'
import { useSession } from 'next-auth/react'
import { useAppDispatch} from '@/redux/hooks';
import React, { useEffect } from 'react'

const TemplateSignedIn: React.FC<any> = ({children}) => {

    const {data: session, status} = useSession()
    const dispatch = useAppDispatch()    
    useEffect(() => {
        if((session?.user as any)?.uid){
            dispatch(fetchUser((session?.user as any).uid as string))
        }
    }, [session, dispatch])

    return (
        <div>
            {children} 
        </div>
    )
}

export default TemplateSignedIn