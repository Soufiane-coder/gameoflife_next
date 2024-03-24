import Link from 'next/link'
import React from 'react'

const GameFieldBtn = () => {
  return (
    <Link className='rounded-full bg-yellow-400 text-gray-100 py-2 px-3 shadow-md transition-all duration-200 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg active:translate-y-0  active:shadow-md font-semibold md:ml-7' href='/game-field'>
        Game field
    </Link>
  )
}

export default GameFieldBtn
