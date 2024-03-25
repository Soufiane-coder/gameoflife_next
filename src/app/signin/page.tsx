import React from 'react'
import { Card } from 'antd'
import GoogleButton from '@/components/google-button.component'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center min-h-lvh'>
      <Card title='Login'>
        <GoogleButton/>
      </Card>
    </div>
  )
}

export default LoginPage
