import React from 'react'

const SignedInLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <header>user nav</header>
            {children}
        </>
    )
}

export default SignedInLayout
