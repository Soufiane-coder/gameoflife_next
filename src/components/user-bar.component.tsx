'use client'
import React from 'react'
import { UserType } from '@/types/user.type'
import { Avatar, Badge } from 'antd'
import { Space } from 'antd'
import { PiCoinsFill } from "react-icons/pi";

const UserBar = ({user} : {user: UserType}) => {
 
    return (
        <header className='h-9 max-h-9 flex items-center relative border-b-2'>
            <Space size='small'>
                <Badge count={user.coins} color='#eab308' status="warning" size='small'>
                    <PiCoinsFill className='fill-yellow-500 h-5 w-5'/>
                </Badge>
                <Avatar src={user.photoURL} />
                <p className=''>{user.displayName}</p>
            </Space>
        </header>
    )
}

export default UserBar
