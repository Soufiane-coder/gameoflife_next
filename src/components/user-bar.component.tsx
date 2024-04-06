'use client'
import React from 'react'
import { UserType } from '@/types/user.type'

const UserBar = ({user} : {user: UserType}) => {
 
    return (
        <header className='h-9 max-h-9 flex items-center relative border-b-2'>
                <p>{user.coins}$</p>
                <p className=''>{user.displayName}</p>
        </header>
    )
}

export default UserBar
