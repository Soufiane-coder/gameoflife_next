'use client'
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import React from 'react'

interface PropsType{
    children: React.ReactNode;
}
const Providers : React.FC<PropsType> = ({children}) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  )
}

export default Providers
