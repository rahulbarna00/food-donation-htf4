'use server';
import React from 'react'
import { sendItToSignup } from '@/auth/tokencheckServer'
const Page = async () => {
  await sendItToSignup()
  return (
    <div>Page</div>
  )
}

export default Page