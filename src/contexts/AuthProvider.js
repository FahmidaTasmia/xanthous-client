import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import app from '../../src/firebase/firebase.config';

export const AuthContext =createContext()
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);
    const providerLogin=(provider)=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUser = (userInfo)=>{
        return updateProfile(auth.currentUser,userInfo);
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return()=>{
            unsubscribe();
        }
    },[])

    const authInfo = { 
        user, 
        loading, 
        setLoading,
        providerLogin, 
        logOut, 
        updateUser,
        createUser, 
        signIn 
    };

    return (
        <div>
            <AuthContext.Provider value ={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;