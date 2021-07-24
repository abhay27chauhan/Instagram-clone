import React, { useEffect, useState } from 'react'
import { Avatar, Container, Grid, Typography } from '@material-ui/core';
import { useStateValue } from '../../context/StateProvider';
import { database } from '../../firebase/firebase.utils';
import Loader from '../../components/Loader/Loader';
import  { useStyles }  from './styles';

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
            setUserPosts(arr);
        }

    }, [profileId, post])

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
                                </div>
                            </div>
                        </Grid>
                        <Grid item className={classes.submaintwo}>
                            <div className={classes.postContainer}>
                            </div>
                        </Grid>
                    </Grid>
                )
            }
        </Container>
    )
}

export default Profile;
