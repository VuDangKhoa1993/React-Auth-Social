import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            // trigger to show loading indicator
            return
        }
        if (user) {
            navigate('/dashboard')
        }
    }, [user, loading])

    const register = () => {
        if (!name) {
            alert('Please enter your name')
        }
        registerWithEmailAndPassword(name, email, password)
    }

    return (
        <>
            <div className="register">
                <div className="register__container">
                    <input
                        type="text"
                        className="register__textBox"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <input
                        type="text"
                        className="register__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail Address"
                    />
                    <input
                        type="password"
                        className="register__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className="register__btn" onClick={register}>
                        Register
                    </button>
                    <button
                        className="register__btn register__google"
                        onClick={signInWithGoogle}
                    >
                        Register with Google
                    </button>
                    <div>
                        Already have an account? <Link to="/">Login</Link> now.
                    </div>
                </div>
            </div>
        </>
    )
}