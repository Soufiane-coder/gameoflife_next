'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import './burg-nav.styles.scss';
import { getMenu } from '../nav-bar/utils';

const BurgNav = ({session}: {session: any}) => {
    const [isNavOn, setIsNavOn] = useState<boolean>(false);
    const router = useRouter()

    const {menuSignedIn, menuNotSignedIn} = getMenu(router)

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
                                (session ? menuSignedIn : menuNotSignedIn).map((item, key) => (

                                    <li className="navigation-burger-menu__item" key={key}>
                                        <a  className="navigation-burger-menu__link text-gray-200 hover:cursor-pointer" onClick={() => handleNavigation(item)} >{item.label}</a>
                                    </li>
                                ))
                        }

                    </ul>
                </nav>
            </div>
  )
}

export default BurgNav
