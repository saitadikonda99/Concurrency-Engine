import React from 'react'
import { useAuth } from '@/hooks/useAuth'

import './navbar.css'

const navbar = () => {

    const { accessToken } = useAuth();

    return (
        <div className="NavbarComponent">
            <div className="NavbarComponent-in">
                <div className="navbar-one">
                    <h1>Concurrency Engine</h1>
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