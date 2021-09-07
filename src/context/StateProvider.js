import React, {createContext, useContext, useEffect, useReducer, useState } from 'react';
import { auth, createUserProfileDocument, database } from "../firebase/firebase.utils"
import { ACTIONS } from './reducer';
import Loader from '../components/Loader/Loader'

const StateContext = createContext();

export function StateProvider({ reducer, initialState, children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);
    const { followReqNotifications, user } = state;

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

                userRef.onSnapshot(snap => {
                    if(snapShot.exists){
                        dispatch({type: ACTIONS.SET_USER, user: {...snap.data()}})
                        console.log("setting user");
                        console.log("setting loading to false");
                        setLoading(false)   
                    }
                })
            }
        })
        const unsubscribeFromPost = database.posts.orderBy('createdAt', 'desc').onSnapshot(async(snapshot) => {                          
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

        const unsub = database.reqNotifications.onSnapshot(snapshot => {
            let arrOfNotObj = snapshot.docs.map(doc => {
                 return {notificationId: doc.id, ...doc.data()}
            })
            dispatch({type: ACTIONS.SET_NOT, not: arrOfNotObj});
        });

        return () => {
            unsubscribeFromAuth();
            unsubscribeFromPost();
            unsub();
        }
    }, [])

    useEffect(() => {
        const updateFollowReq = async () => {
            if(!user) return;
            let followReqs = user.followReqs;
            let arrOfIds = Object.keys(followReqs);

            let filteredData = followReqNotifications.filter(not => (not.recipient === user.userId && not.type !== "request"));
            if(filteredData.length === 0) return;

            for(let obj of filteredData){   
                if(obj.type !== "remove" && arrOfIds.length > 0){
                    arrOfIds = arrOfIds.filter(id => id !== obj.sender);
                    let newReqObj = {};
                    for(let id of arrOfIds){
                        newReqObj[id] = followReqs[id];
                    }

                    await database.users.doc(user.userId).update({
                        followReqs: newReqObj
                    })

                    if(obj.type === "accept"){
                        await database.users.doc(user.userId).update({
                            following: [...user.following, obj.sender]
                        })
                    }else if(obj.type === "reject"){
                        await database.reqNotifications.doc(obj.notificationId).delete();
                    }
                }else if(obj.type === "remove"){
                    let followers = user.followers;
                    followers = followers.filter(id => id !== obj.sender);
                    await database.users.doc(user.userId).update({
                        followers: followers
                    })
                    await database.reqNotifications.doc(obj.notificationId).delete();
                }
            }
        }

        updateFollowReq();
    }, [followReqNotifications, user])

    const value = {login , signout, signup, setLoading, state, dispatch}
    return (
        <StateContext.Provider value={value}>
            {console.log("inside auth", loading)}
            {!loading ? children : (<Loader size={50}/>)}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext);