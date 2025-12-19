"use client"
import React from 'react'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

import { UserIcon } from '../../../../components/ui/profile'
import { LockIcon } from '../../../../components/ui/LockIcon'
import './page.css'
import Link from 'next/dist/client/link'

interface User {
    username: string;
    password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const page = () => {

    const { setAccessToken } = useAuth();
    const router = useRouter();

    const [user, setUser] = React.useState<User>({
        username: '',
        password: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async () => {
        // Validate input fields
        if (!user.username || !user.password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const response = await axios.post(`${API_URL}/auth/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (response.status === 200 && response.data) {
                setAccessToken(response.data.token);
                router.push('/dashboard');
            }
        } catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError(error.response.data?.message || 'Please provide valid credentials');
                        break;
                    case 401:
                        setError('Invalid username or password');
                        break;
                    case 500:
                        setError('Server error. Please try again later');
                        break;
                    default:
                        setError('An unexpected error occurred');
                }
            } else if (error.request) {
                setError('Cannot connect to server. Please check your internet connection');
            } else {
                setError('An error occurred. Please try again');
            }
            console.error('Login error:', error);
        } finally { 
            setLoading(false);
        }
    }

  return (
       <div className="LoginComponent">
        <div className="LoginComponent-in">
            <div className="login-one">
                <h1>Welcome Back!</h1>
                <p>Login to your account to continue</p>
            </div>
            <div className="login-two">

                <div className="login-two-one">
                    <UserIcon size={20} />
                    <input 
                        type="text" 
                        placeholder="Enter your Email" 
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        name="username"
                    />
                </div>

                <div className="login-two-one">
                    <LockIcon size={20} />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        name="password"
                    />
                </div>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
                
                <button 
                    className="login-btn" 
                    onClick={handleSubmit}
                    disabled={loading || !user.username || !user.password}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                
                <div className="signup-redirect">
                    <p>Don't have an account? <Link href="/auth/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
       </div>
  )
}

export default page