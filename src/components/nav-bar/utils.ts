import { LoginIcon, ContactSupportIcon } from '../../../public/icons';
import { PiChartLineFill, PiSignOutBold, PiGameControllerFill, PiHouseFill, } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { MenuItemType } from './nav-bar.component'
import { signIn, signOut, } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const getMenu = (router : AppRouterInstance) => {
    const menuSignedIn: MenuItemType[] = [
		{
		label: 'home',
		icon: PiHouseFill,
		url: '/',
		action: (url: string) => router.push(url),
		},
		{
		label: 'game field',
		icon: PiGameControllerFill,
		url: '/game-field',
		action: (url: string) => router.push(url),
		},
		{
		label: 'Statistics',
		icon: PiChartLineFill,
		url: '/statistics',
		action: (url: string) => router.push(url)
		},
		{
		label: 'Settings',
		icon: MdSettings,
		url: '/settings',
		action: (url: string) => router.push(url)
		},
		{
		label: 'Sign out',
		icon: PiSignOutBold,
		url: '/',
		action: (url: string) => signOut({ callbackUrl: '/signin' })
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

	const menuNotSignedIn: MenuItemType[] = [
		{
		label: 'home gol',
		icon: PiHouseFill,
		url: '/',
		action: (url: string) => router.push(url),
		},
		{
		label: 'game field',
		icon: PiGameControllerFill,
		url: '/game-field',
		action: (url: string) => router.push(url),
		},
		{
		label: 'sign up',
		icon: LoginIcon,
		url: '/signin',
		action: (url: string) => signIn(),
		},
		{
		label: 'contact',
		icon: ContactSupportIcon,
		url: '/about-us',
		action: (url: string) => router.push(url),
		}
	]
    return {menuSignedIn, menuNotSignedIn}
}