import React, { useEffect, useState } from 'react'
import { Avatar, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { useStateValue } from '../../context/StateProvider';
import { database } from '../../firebase/firebase.utils';
import Loader from '../../components/Loader/Loader';
import  { useStyles }  from './styles';
import PostCard from '../../components/PostCard/PostCard';

function Profile(props) {
    const classes = useStyles();
    const { state: { user, post } } = useStateValue()
    const [profileUser, setProfileUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const profileId = props.match.params.id;

    useEffect(() => {
        if(profileId === user.userId){
            setProfileUser({
                ...user
            })
            fetchPosts(user)
        }else{
            fetchUser().then(userData => fetchPosts(userData))
        }

        async function fetchUser(){
            const doc = await database.users.doc(profileId).get();
            setProfileUser({
                ...doc.data()
            })
            return doc.data();
        }

        function fetchPosts(userData){
            let { postIds } = userData;
            let arr = [];
            for(let i=0; i<postIds.length; i++){
                arr.push(post.find(obj => obj.postId === postIds[i]));
            }
            if(arr.length > 0){
                setUserPosts(arr);
            }
        }

    }, [profileId, post, user])

    console.log(props.match.params.id);
    return (
        <Container className={classes.root} component="main" maxWidth="md">
            {
                profileUser === null ? <Loader size={50}/>
                :
                (
                    <Grid className={classes.main} container direction="column" alignItems="center">
                        <Grid item className={classes.submain}>
                            <div className={classes.infoContainer}>
                                <div className={classes.profileImage}>
                                    <Avatar aria-controls="simple-menu" aria-haspopup="true" className={classes.purple} alt={profileUser.displayName} src={profileUser.profileUrl} >
                                        {profileUser.displayName.charAt(0)}
                                    </Avatar>
                                </div>
                                <div className={classes.userInfo}>
                                    <Typography variant="h5">      
                                        {profileUser.displayName}
                                    </Typography>
                                    <div className={classes.postInfo}>
                                        <Typography variant="h6">
                                            {userPosts !== null ? userPosts.length : "0"} posts
                                        </Typography>
                                        <Typography variant="h6">
                                            0 Followers
                                        </Typography>
                                        <Typography variant="h6">
                                            0 Following
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item className={classes.submaintwo}>
                            {
                                userPosts === null ? <div className={classes.loader}><CircularProgress /></div>
                                :
                                (
                                    <div className={classes.postContainer}>
                                        {   
                                            
                                            userPosts.map(obj=> (
                                                <PostCard key={obj.postId} {...obj} />
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </Grid>
                    </Grid>
                )
            }
        </Container>
    )
}

export default Profile;
