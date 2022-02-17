import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import {
    auth,
    db,
    logout
} from '../../firebase'
import {
    query,
    collection,
    getDocs,
    where
} from 'firebase/firestore'
import './style.css'


export const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth)
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0]?.data()
            setName(data?.name)
        } catch (e) {
            console.error(e)
            alert("An error occured while fetching user data")
        }
    }

    useEffect(() => {
        if (loading) {
            // show loading indicator
            return
        }
        if (!user) return navigate('/')
        fetchUserName()
    }, [loading, user])


    return (
        <>
            <div className="dashboard">
                <div className="dashboard__container">
                    Logged in as
                    <div>{name}</div>
                    <div>{user?.email}</div>
                    <button className="dashboard__btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}