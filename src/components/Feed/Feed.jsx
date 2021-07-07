import React from 'react'
import { useStateValue } from '../../context/StateProvider';
import Header from '../Header/Header'

function Feed() {
    const { state: { user } } = useStateValue()
    return (
        <div>
            {console.log("user ", user)}
            <Header />
        </div>
    )
}

export default Feed;
