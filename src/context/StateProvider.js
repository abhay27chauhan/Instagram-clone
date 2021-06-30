import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import { auth } from "../firebase/firebase.utils"
import { ACTIONS } from './reducer';

const StateContext = createContext();

export function StateProvider({ reducer, initialState, children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signout() {
        return auth.signOut();
    }

    async function signup(email, password){
        const { user } = await auth.createUserWithEmailAndPassword(email, password);   
        return user;
    }

    useEffect(() => {
        console.log("inside effect")
        const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
            console.log("inside event listner")
            
            dispatch({type: ACTIONS.SET_USER, user: userAuth})
            console.log("setting user");
            console.log("setting loading to false");
            setLoading(false)
        })
        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    const value = {login , signout, signup, state, dispatch}
    return (
        <StateContext.Provider value={value}>
            {console.log("inside auth", loading)}
            {!loading && children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);