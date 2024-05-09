import React from 'react'
// import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import authOptions from '../api/auth/[...nextauth]/authOptions'

// export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    
// }

const Test = async (props: any) => {
    const session = await getServerSession(authOptions)
    console.log({session})
    // console.log({props})
  return (
    <div>
      
    </div>
  )
}

export default Test
