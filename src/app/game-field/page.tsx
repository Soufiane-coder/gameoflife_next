'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
const GameField = () => {
  const {data: session} = useSession({required: true})
  return (
    <div>
      game field page
    </div>
  )
}

export default GameField
