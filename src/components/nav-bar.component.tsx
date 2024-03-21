import React, {FC, SVGProps} from 'react'

import { HomeIcon, GameFieldIcon } from '../../public/icons';
import Link from 'next/link';
// import { ReactComponent as GamePageIcon } from '../../assets/icons/gamepage.svg';
// import { ReactComponent as SignInPageIcon } from '../../assets/icons/sign-in-page.svg';
// import { ReactComponent as SignUpPageIcon } from '../../assets/icons/sign-up-page.svg';
// import { ReactComponent as SettingPageIcon } from '../../assets/icons/settings.svg';
// import { ReactComponent as ClockIcon } from '../../assets/icons/schedule.svg';
// import { ReactComponent as StatisticsIcon } from '../../assets/icons/statistics.svg';
// import { ReactComponent as CalendarIcon} from '../../assets/icons/calendar.svg';
// import { selectCurrentUser } from '../../redux/user/user.selector';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

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
   // {
    //     label: 'sign up',
    //     icon: SignUpPageIcon,
    //     url: '/signin',
    //     action: () => { },
    // }, {
    //     label: 'sign in',
    //     icon: SignInPageIcon,
    //     url: '/signin',
    //     action: () => { },
    // }
    ]
    return (
        <>
            <div className="bg-yellow-400 flex flex-col w-fit rounded-l-3xl fixed right-0 top-10">
                {
    //                 // user ? menuSignedIn.map((item, key) => (

    //                 //     <item.icon key={key + '_in'} className='icon' onClick={item.action} />

    //                 // ))
    //                 //     :
                        menuNotSignedIn.map((item, key) => (
                            <Link href={item.url}>
                                <item.icon 
                                    className='w-nav-icon h-nav-icon fill-slate-100 border p-2 m-2 rounded-full border-gray-200' />
                            </Link>
    //                         // <item.icon key={key} className='icon' onClick={item.action} />

                        ))
                }
            </div>
            {/* <div className="navigation-burger-menu">
    //             <input type="checkbox" className="navigation-burger-menu__checkbox" id="navi-toggle" onChange={event => setIsNavOn(event.target.checked)} checked={isNavOn} />

    //             <label htmlFor="navi-toggle" className="navigation-burger-menu__button">
    //                 <span className="navigation-burger-menu__icon">&nbsp;</span>
    //             </label>

    //             <div className="navigation-burger-menu__background">&nbsp;</div>

    //             <nav className="navigation-burger-menu__nav">
    //                 <ul className="navigation-burger-menu__list">

    //                     {
    //                         // user ? menuSignedIn.map((item, key) => (

    //                         //     <li className="navigation-burger-menu__item" key={key + '_in'}><div className="navigation-burger-menu__link" onClick={() => { history.push(item.url); setIsNavOn(false); item.action(); }} >{item.label}</div></li>
    //                         // ))
    //                         //     :
    //                             menuNotSignedIn.map((item, key) => (

    //                                 <li className="navigation-burger-menu__item" key={key}><div className="navigation-burger-menu__link" onClick={() => { router.push(item.url); setIsNavOn(false); item.action(); }} >{item.label}</div></li>

    //                             ))
    //                     }

    //                 </ul>
    //             </nav>
    //         </div> */}
         </>
    )
}

// const mapStateToProps = createStructuredSelector({
//     user: selectCurrentUser
// })


export default NavigationBar;