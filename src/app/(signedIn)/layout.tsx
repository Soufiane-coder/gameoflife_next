import React from 'react'
import UserBar from '@/components/user-bar.component';
import { UserType } from '@/types/user.type';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import StyledComponentsRegistry from '../styled-components-registry';


const SignedInLayout = async ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await getServerSession(authOptions)
    return (
        <StyledComponentsRegistry>
            <main className='p-2 md:pr-20 min-h-full'>
                <UserBar user={session?.user as UserType}/>
                {children}
            </main>
        </StyledComponentsRegistry>
    )
}

export default SignedInLayout
