import Link from 'next/link'
import React from 'react'

const GameFieldBtn = () => {
  return (
    <Link className='rounded-full bg-yellow-500 text-gray-200 p-2 shadow-md transition-all duration-200 hover:cursor-pointer hover:-translate-y-2 hover:shadow-lg active:translate-y-0 active:shadow-md' href='/game-field'>
        Game field
    </Link>
  )
}

export default GameFieldBtn
