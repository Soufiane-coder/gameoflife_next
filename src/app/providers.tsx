'use client'
import { SessionProvider } from "next-auth/react";

import React from 'react'

interface PropsType{
    children: React.ReactNode;
}
const Providers : React.FC<PropsType> = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Providers
