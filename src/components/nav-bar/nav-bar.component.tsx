'use client' // todo change this compo to server compo

import React, {FC, SVGProps, useEffect} from 'react'

import { HomeIcon, GameFieldIcon , LoginIcon, ContactSupportIcon} from '../../../public/icons';
import { VscSignOut } from "react-icons/vsc";
import Link from 'next/link';
import BurgNav from '../burg-nav/burg-nav.component';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface MenuItemType {
    label: string;
    icon: FC<SVGProps<SVGElement>>;
    url: string;
    action: (url: string) => void;
}


const NavigationBar : React.FC = ({}) => {    

    const {data: session,} = useSession()
    const router = useRouter()
    
    const menuSignedIn: MenuItemType[] = [
    {
        label: 'home gol',
        icon: HomeIcon,
        url: '/',
        action: (url : string) => router.push(url),
    }, 
    {
        label: 'game field',
        icon: GameFieldIcon,
        url: '/game-field',
        action: (url : string) => router.push(url),
    }, 
    {
        label: 'clock view',
        icon:  VscSignOut,
        url: '/clockView',
        action: (url : string) => signOut({callbackUrl: '/signin'})
    }, 
    // {
    //     label: 'calendar',
    //     icon: CalendarIcon,
    //     url: '/calendar',
    //     action: () => { }
    // },{
    //     label: 'statistics',
    //     icon: StatisticsIcon,
    //     url: '/statistics',
    //     action: () => { }
    // }, {
    //     label: 'settings',
    //     icon: SettingPageIcon,
    //     url: '/settings',
    //     action: () => { }
    // },

    ]

    const menuNotSignedIn : MenuItemType[] = [
        {
        label: 'home gol',
        icon: HomeIcon,
        url: '/',
        action: (url : string) => router.push(url),
        }, 
        {
            label: 'game field',
            icon: GameFieldIcon,
            url: '/game-field',
            action: (url : string) => router.push(url),
        }, 
        {
            label: 'sign up',
            icon: LoginIcon,
            url: '/signin',
            action: (url : string) => signIn(),
        }, 
        {
            label: 'contact',
            icon: ContactSupportIcon,
            url: '/about-us',
            action: (url : string) => router.push(url),
        }
    ]

    const usedMenu =  session ? menuSignedIn : menuNotSignedIn
    return (
        <>
            <div className="hidden bg-yellow-400 md:flex flex-col w-fit rounded-l-4xl fixed right-0 top-10 z-10">
                {
                    usedMenu.map((item, key) => (
                        <item.icon 
                            key={key}
                            onClick={() => item.action(item.url)}
                            className='w-nav-icon cursor-pointer h-nav-icon fill-slate-100 border-2 p-1 m-2 rounded-full border-gray-100' />
                    ))
                }
            </div>
            <BurgNav {...{menuNotSignedIn, menuSignedIn}}/>
         </>
    )
}

// const mapStateToProps = createStructuredSelector({
//     user: selectCurrentUser
// })


export default NavigationBar;