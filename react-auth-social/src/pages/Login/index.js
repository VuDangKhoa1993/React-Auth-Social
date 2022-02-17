import React, { useState, useEffect } from 'react'
import { auth, loginWithEmailAndPassword, signInWithGoogle } from '../../firebase'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import './style.css'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()


    useEffect(() => {
        if (loading) {
            // maybe trigger a loading page
            return
        }
        
        if (user) {
            alert('register success')
            navigate("/dashboard")
        }
    }, [loading, user])

    return (
        <div className='login'>
            <div className='login__container'>
                {loading && <div>Loading...</div> }
                <input
                    type='text'
                    className='login__textBox'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='E-mail address'
                />

                <input
                    type='password'
                    className='login__textBox'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className='login__btn'
                    onClick={() => loginWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button
                    className='login__btn login__google'
                    onClick={() => signInWithGoogle()}
                >
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot password</Link>
                </div>
                <div>
                    Don't have an account ? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    )
}