'use client'

import React, {useState} from 'react'
import { MenuItemType } from '../nav-bar/nav-bar.component'
import { useRouter } from 'next/navigation';
import './burg-nav.styles.scss';

interface PropsType {
    menuNotSignedIn: MenuItemType[];
    menuSignedIn: MenuItemType[];
}

const BurgNav : React.FC<PropsType> = ({menuNotSignedIn, menuSignedIn}) => {
    const [isNavOn, setIsNavOn] = useState<boolean>(false);
    const router = useRouter()

    const handleNavigation = (item : any) => {
        router.push(item.url)
        setIsNavOn(false)
        item.action()
    }

    return (
    <div className="navigation-burger-menu md:hidden">
                <input type="checkbox" className="navigation-burger-menu__checkbox" id="navi-toggle" onChange={event => setIsNavOn(event.target.checked)} checked={isNavOn} />

                <label htmlFor="navi-toggle" className="navigation-burger-menu__button bg-yellow-400 shadow-lg">
                    <span className="navigation-burger-menu__icon">&nbsp;</span>
                </label>

                <div className="navigation-burger-menu__background z-50 bg-gradient-radial from-green-700 to-green-900">&nbsp;</div>

                <nav className="navigation-burger-menu__nav">
                    <ul className="navigation-burger-menu__list">

                        {
                            // user ? menuSignedIn.map((item, key) => (

                            //     <li className="navigation-burger-menu__item" key={key + '_in'}><div className="navigation-burger-menu__link" onClick={() => { history.push(item.url); setIsNavOn(false); item.action(); }} >{item.label}</div></li>
                            // ))
                            //     :
                                menuNotSignedIn.map((item, key) => (

                                    <li className="navigation-burger-menu__item" key={key}>
                                        <div className="navigation-burger-menu__link text-gray-200" onClick={() => handleNavigation(item)} >{item.label}</div>
                                    </li>

                                ))
                        }

                    </ul>
                </nav>
            </div>
  )
}

export default BurgNav
