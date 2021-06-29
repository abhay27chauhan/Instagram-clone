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

    async function signup(displayName, email, password){
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        
        return createUserProfileDocument(user, { displayName });
    }

    useEffect(() => {
        console.log("inside effect")
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            console.log("inside event listner")
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapShot => {
                    let userData = {
                        id: snapShot.id,
                        ...snapShot.data()
                    }
                    console.log(userData)
                    console.log("setting user");
                    dispatch({type: ACTIONS.SET_USER, user: userData})
                    console.log("setting loading to false");
                    setLoading(false)
                    console.log("done")
                });
            }else{
                dispatch({type: ACTIONS.SET_USER, user: userAuth})
                console.log("setting user to null");
                console.log("setting loading to false");
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
            {console.log("inside auth", loading)}
            {!loading && children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);