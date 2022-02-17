import { initializeApp } from 'firebase/app'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    getAuth
} from 'firebase/auth'

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB493RIJ3DDE5cIyKbUokLUHHpQRX5qmY8",
    authDomain: "dk-react-auth-social.firebaseapp.com",
    projectId: "dk-react-auth-social",
    storageBucket: "dk-react-auth-social.appspot.com",
    messagingSenderId: "548703719988",
    appId: "1:548703719988:web:22016234ac92ce45c9f061",
    measurementId: "G-C23B3KQ5MQ"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            const docRef = doc(collection(db, "users"))
            await setDoc(docRef, {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email 
            })
        }
    } catch (e) {
        console.log(e)
        alert(e.message)
    }
}

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
        console.log(e)
        alert(e.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email
        })
    } catch (e) {
        console.log(e)
        alert(e.message)
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Password reset link sent!");
    } catch (e) {
        console.log(e)
        alert(e.message)
    }
}

const logout = async () => {
    signOut(auth)
}

export {
    auth,
    db,
    signInWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
}