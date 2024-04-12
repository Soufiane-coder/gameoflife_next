'use client'
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { notification, message } from 'antd'

import React, { createContext } from 'react'

export const ContextHolderNotification = createContext<any>(null);
export const ContextHolderMessage = createContext<any>(null);

interface PropsType{
    children: React.ReactNode;
}
const Providers : React.FC<PropsType> = ({children}) => {
  const [notificationApi, contextHolderNotification] = notification.useNotification()
  const [messageApi, contextHolderMessage] = message.useMessage();

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Provider store={store}>
        <ContextHolderNotification.Provider value={notificationApi}>
          <ContextHolderMessage.Provider value={messageApi}>
            {contextHolderNotification}
            {contextHolderMessage}
            {children}
          </ContextHolderMessage.Provider>
        </ContextHolderNotification.Provider>
      </Provider>
    </SessionProvider>
  )
}

export default Providers
