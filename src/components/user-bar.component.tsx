import React from 'react'
import { UserType } from '@/types/user.type'
import { Avatar, Badge } from 'antd'
import { Space } from 'antd'
import { PiCoinsFill } from "react-icons/pi";
import golIcon from '../../public/icons/GOL.png'
import Image from 'next/image';
import Link from 'next/link';

const UserBar = async ({user} : {user: UserType}) => {
    return (
        <header className='h-10 max-h-10 flex items-center justify-between relative border-b-2'>
            <div className='flex items-center'>
                {/* <h2 className='h2'>Game Of Life</h2> */}
                <Link href='/' >
                    <Image src={golIcon} alt='image' height={30} />
                </Link>
            </div>
            <div className='flex items-center gap-5'>
                <Badge count={user?.coins} color='#eab308' status="warning" size='small' offset={[0, 5]}>
                    <PiCoinsFill className='fill-yellow-500 h-6 w-6'/>
                </Badge>
                <div className='border-l-2 pl-2'>
                    <Space size='small'>
                        <Avatar src={user?.photoURL}/>
                        <p className=''>{user?.displayName}</p>
                    </Space>
                </div>
            </div>
        </header>
    )
}

export default UserBar
