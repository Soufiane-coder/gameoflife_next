'use client' // todo change this compo to server compo

import React, {FC, SVGProps} from 'react'

import { HomeIcon, GameFieldIcon , LoginIcon, ContactSupportIcon} from '../../../public/icons';
import Link from 'next/link';
import BurgNav from '../burg-nav/burg-nav.component';

export interface MenuItemType {
    label: string;
    icon: FC<SVGProps<SVGElement>>;
    url: string;
    action: () => void;
}


const NavigationBar : React.FC = ({}) => {    

    const menuSignedIn: MenuItemType[] = [
    //     {
    //     label: 'home gol',
    //     icon: HomePageIcon,
    //     url: '/',
    //     action: () => { }
    // }, 
    // {
    //     label: 'game field',
    //     icon: GamePageIcon,
    //     url: '/game-field',
    //     action: () => { }
    // }, {
    //     label: 'clock view',
    //     icon: ClockIcon,
    //     url: '/clockView',
    //     action: () => { }
    // }, {
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
        action: () => { },
    }, 
    {
        label: 'game field',
        icon: GameFieldIcon,
        url: '/game-field',
        action: () => { }
    }, 
   {
        label: 'sign up',
        icon: LoginIcon,
        url: '/signin',
        action: () => { },
    }, 
    {
        label: 'sign in',
        icon: ContactSupportIcon,
        url: '/signin',
        action: () => { },
    }
    ]
    return (
        <>
            <div className="hidden bg-yellow-400 md:flex flex-col w-fit rounded-l-4xl fixed right-0 top-10 z-10">
                {
                        menuNotSignedIn.map((item, key) => (
                            <Link href={item.url} key={key}>
                                <item.icon 
                                    className='w-nav-icon h-nav-icon fill-slate-100 border-2 p-1 m-2 rounded-full border-gray-100' />
                            </Link>
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