"use client"
import React from 'react'
import { useAuth } from '@/hooks/useAuth'

const page = () => {
    const { accessToken } = useAuth();
  return (
    <div>{accessToken}</div>
  )
}

export default page