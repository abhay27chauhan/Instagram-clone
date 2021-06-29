import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils"
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

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        console.log("inside effect")
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            console.log("inside event listner")
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapShot => {
                    dispatch({type: ACTIONS.SET_USER, user: {
                        id: snapShot.id,
                        ...snapShot.data()
                    }})
                });
                setLoading(false)
            }else{
                dispatch({type: ACTIONS.SET_USER, user: userAuth})
                setLoading(false)
            }
        })
        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    const value = {login , signout, signup, state, dispatch}
    return (
        <StateContext.Provider value={value}>
            {console.log("inside auth")}
            {!loading && children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);