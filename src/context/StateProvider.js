import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import { auth, createUserProfileDocument, database } from "../firebase/firebase.utils"
import { ACTIONS } from './reducer';
import Loader from '../components/Loader/Loader'

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
        const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            console.log("inside event listner")

            if(!userAuth){
                dispatch({type: ACTIONS.SET_USER, user: userAuth})
                console.log("setting user");
                console.log("setting loading to false");
                setLoading(false)
            }else{
                const obj = await createUserProfileDocument(userAuth)
                const {userRef, snapShot} = obj;

                if(snapShot.exists){
                    userRef.onSnapshot(snap => {
                        dispatch({type: ACTIONS.SET_USER, user: {...snap.data()}})
                        console.log("setting user");
                        console.log("setting loading to false");
                        setLoading(false)   
                    })
                }

                database.posts.orderBy('createdAt', 'desc').onSnapshot(async(snapshot) => {                          
                        let postsArr = snapshot.docs.map(doc => doc.data());
                        let newPostArr = [];
                        for(let i=0; i<postsArr.length; i++){
                            let obj = postsArr[i];

                            let userRef = database.users.doc(obj.auid);
                            let udoc = await userRef.get();
                            obj.user = udoc.data().displayName;
                            obj.profileUrl = udoc.data().profileUrl;
        
                            newPostArr.push(obj);
                        }
                        dispatch({type: ACTIONS.SET_POST, post: newPostArr})
                    });
            }
        })
        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    const value = {login , signout, signup, setLoading, state, dispatch}
    return (
        <StateContext.Provider value={value}>
            {console.log("inside auth", loading)}
            {!loading ? children : (<Loader size={50}/>)}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);