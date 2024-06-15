"use client"
import React from 'react'

import { LoginIcon, ContactSupportIcon } from '../../../public/icons';
import { PiChartLineFill, PiSignOutBold, PiGameControllerFill, PiHouseFill, } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { MenuItemType } from './nav-bar.component'
import { signIn, signOut, } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getMenu } from './utils';

const ButtonNav = ({ session }: { session: any }) => {
	const router = useRouter()

	const {menuSignedIn, menuNotSignedIn} = getMenu(router)

	const usedMenu = session ? menuSignedIn : menuNotSignedIn
	return usedMenu.map((item, key) => (
		<item.icon
			key={key}
			onClick={() => item.action(item.url)}
			className='w-nav-icon cursor-pointer h-nav-icon fill-slate-100 border-2 p-1 m-2 rounded-full border-gray-100' />
  	))
}

export default ButtonNav
