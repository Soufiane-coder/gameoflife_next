import React, {FC, SVGProps, useEffect} from 'react'

import BurgNav from '../burg-nav/burg-nav.component';

import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import ButtonNav from './button';

export interface MenuItemType {
    label: string;
    icon: FC<SVGProps<SVGElement>>;
    url: string;
    action: (url: string) => void;
}


const NavigationBar : React.FC = async ({}) => {    
    const session = await getServerSession(authOptions)
    return (
        <>
            <div className="hidden bg-yellow-400 md:flex flex-col w-fit rounded-l-4xl fixed right-0 top-10 z-10">
                {
                    <ButtonNav session={session}/>
                }
            </div>
            <BurgNav session={session}/>
         </>
    )
}

// const mapStateToProps = createStructuredSelector({
//     user: selectCurrentUser
// })


export default NavigationBar;