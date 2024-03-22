import React, {FC, SVGProps} from 'react'

import { HomeIcon, GameFieldIcon , LoginIcon, ContactSupportIcon} from '../../../public/icons';
import Link from 'next/link';
import styles from './nav-bar.module.scss'

interface MenuItemType {
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
            <div className=" bg-yellow-400 flex flex-col w-fit rounded-l-4xl fixed right-0 top-10 z-10">
                {
                        menuNotSignedIn.map((item, key) => (
                            <Link href={item.url} key={key}>
                                <item.icon 
                                    className='w-nav-icon h-nav-icon fill-slate-100 border-2 p-1 m-2 rounded-full border-gray-100' />
                            </Link>

                        ))
                }
            </div>
            {/* <div>
                <input type="checkbox" className='hidden checkbox' id="navi-toggle"/>

                <label htmlFor="navi-toggle" className='button bg-yellow-400 h-burger-menu-height w-burger-menu-width fixed top-menu-position-top shadow-lg right-menu-position-right rounded-full z-10 text-center cursor-pointer'>
                    <span className={`icon ${styles.icon}`}>&nbsp;</span>
                </label>

                <div 
                    className={`${styles["navigation-burger-menu__background"]} bg-gradient-to-br from-green-800 to-green-900`}>&nbsp;</div>

                <nav className="navigation-burger-menu__nav">
                    <ul className="navigation-burger-menu__list">

                        {
                                menuNotSignedIn.map((item, key) => (
<></>
                                    // <li className="navigation-burger-menu__item" key={key}><div className="navigation-burger-menu__link" onClick={() => { router.push(item.url); setIsNavOn(false); item.action(); }} >{item.label}</div></li>

                                ))
                        }

                    </ul>
                </nav>
            </div> */}
         </>
    )
}

// const mapStateToProps = createStructuredSelector({
//     user: selectCurrentUser
// })


export default NavigationBar;