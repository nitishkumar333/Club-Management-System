import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react"
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setIsLoading] = useState(true);
    useEffect(async ()=>{
        await onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user);
            }else{
                setCurrentUser(null);
            }
            setIsLoading(false);
        })
    },[])
    if(loading){
        return <>Loading...</>
    }
    return (
        <AuthContext.Provider value={{currentUser}} >
            {children}
        </AuthContext.Provider>
    )
}