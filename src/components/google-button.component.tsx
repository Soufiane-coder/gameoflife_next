'use client'

import React from 'react'
import { Button } from 'antd'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

const GoogleButton = () => {
  return (
    <Button onClick={() => signIn('google', {callbackUrl: '/game-field'})} icon={<FcGoogle/>}>
          Connect with Google
    </Button>
  )
}

export default GoogleButton
