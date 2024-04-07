import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Game field | Game of life",
  description: 'description',
};

const LayoutGameField = ({children} : {children : React.ReactNode}) => {
  return (
    children
  )
}

export default LayoutGameField
