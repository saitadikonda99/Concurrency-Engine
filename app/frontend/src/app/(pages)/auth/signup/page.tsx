"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { UserIcon } from '../../../../components/ui/profile'
import { LockIcon } from '../../../../components/ui/LockIcon'
import './page.css'

interface SignupUser {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const page = () => {

  const router = useRouter();

  const [user, setUser] = React.useState<SignupUser>({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    if (!user.username || !user.fullName || !user.email || !user.password || !user.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (user.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { confirmPassword, ...signupData } = user;
      const response = await axios.post(`${API_URL}/auth/signup`, signupData);

      if (response.status === 201 && response.data) {
        router.push('/auth/login');
      }
      
    } catch (error: any) {
      console.error('Signup failed:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError(error.response.data?.message || 'Invalid signup data');
            break;
          case 409:
            setError(error.response.data?.message || 'Username already exists');
            break;
          case 500:
            setError('Server error. Please try again later');
            break;
          default:
            setError(error.response.data?.message || 'Signup failed');
        }
      } else if (error.request) {
        setError('Cannot connect to server. Please check your internet connection');
      } else {
        setError('An error occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="SignupComponent">
      <div className="SignupComponent-in">
        <div className="signup-one">
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </div>
        <div className="signup-two">
          <div className="signup-two-one">
            <UserIcon size={20} />
            <input 
              type="text" 
              placeholder="Username" 
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
            />
          </div>

          <div className="signup-two-one">
            <UserIcon size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={user.fullName}
              onChange={(e) => setUser({...user, fullName: e.target.value})}
            />
          </div>

          <div className="signup-two-one">
            <UserIcon size={20} />
            <input 
              type="email" 
              placeholder="Email" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div className="signup-two-one">
            <LockIcon size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>

          <div className="signup-two-one">
            <LockIcon size={20} />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={user.confirmPassword}
              onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
            />
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <div className="signup-two-two">
            <button 
              className="signup-btn" 
              onClick={handleSubmit} 
              disabled={loading || !user.username || !user.fullName || !user.email || !user.password || !user.confirmPassword}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page