'use client'
import React, { useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { useGetRoutinesQuery, useGetUserQuery } from '@/redux/services/apiSlice'

const GameField = () => {
  const {data: session, status} = useSession()
  // const {data: routines, isLoading, isError} = useGetUserQuery(session?.user)

  // console.log({data: routines, isLoading, isError})
  if (status === 'loading'){
    return (<h1>Loading...</h1>)
  }

  
  return (
    <div>
      {session?.user?.email}
    </div>
  )
}

export default GameField
