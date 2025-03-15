'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function Footer() {
  const { user} = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect (() => {
    setIsLoggedIn(window.location.href.toString().includes('sign'))
  }, [])
  return !isLoggedIn && (
    <div>Footer</div>
  )
}

export default Footer