"use client"
import React from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

import './navbar.css'

const navbar = () => {

    const { accessToken } = useAuth();

    return (
        <div className="NavbarComponent">
            <div className="NavbarComponent-in">
                <div className="navbar-one">
                    <Image src="/Logo.svg" alt="Logo" width={120} height={40} />
                    <p>Concurrency Engine</p>
                </div>
                <div className="navbar-two">
                    {accessToken ?
                        <button>Logout</button>
                        :
                        <>
                            <button>Login</button>
                            <button>Signin</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default navbar