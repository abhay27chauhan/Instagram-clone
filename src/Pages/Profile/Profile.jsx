import React, { useEffect, useState, Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import { useStateValue } from "../../context/StateProvider";
import { database } from "../../firebase/firebase.utils";
import Loader from "../../components/Loader/Loader";
import { useStyles } from "./styles";
import PostCard from "../../components/PostCard/PostCard";
import EditDetails from "../../components/EditDetails/EditDetails";
import UploadImage from "../../components/UploadImage/UploadImage";

function Profile(props) {
  const classes = useStyles();
  const {
    state: { user, post },
  } = useStateValue();
  const [loading, setLoading] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [pending, setPending] = useState(() => {
    if (Object.keys(user.followReqs).includes(props.match.params.id)) {
      return true;
    }
    return false;
  });
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const gridRef = useRef(null)
  const profileId = props.match.params.id;

  const handleClick = () => {
    setOpen(true);
  };

  const handleImageUpload = () => {
    setShow(true);
  }

  const handleClose = (e) => {
    if(ReactDOM.findDOMNode(e.target).parentNode.parentNode === gridRef.current){
      setShow(false);
    }
  }

  const handleFollow = async () => {
    if (Object.keys(user.followReqs).includes(profileId) || user.following.includes(profileId)) {
      setReqLoading(true);
      if (user.following.includes(profileId)) {
        let following = user.following;
        let Ids = following.filter(id => id != profileId);
        await database.users.doc(user.userId).update({
          following: Ids
        });
        setReqLoading(false);
        await database.reqNotifications.add({
          sender: user.userId,
          recipient: profileId,
          createdAt: database.getUserTimeStamp(),
          type: "remove",
        })
      } else {
        let arr = Object.keys(user.followReqs);
        arr = arr.filter(id => id != profileId);

        let newReqObj = {};
        for (let id of arr) {
          newReqObj[id] = user.followReqs[id];
        }
        await database.reqNotifications.doc(user.followReqs[profileId]).delete();
        await database.users.doc(user.userId).update({
          followReqs: newReqObj
        });
        setReqLoading(false);
      }
    } else {
      setPending(true);
      setReqLoading(true);
      let docRef = await database.reqNotifications.add({
        sender: user.userId,
        recipient: profileId,
        createdAt: database.getUserTimeStamp(),
        type: "request",
      })
      await database.users.doc(user.userId).update({
        followReqs: { ...user.followReqs, [profileId]: docRef.id }
      });
      setReqLoading(false);
    }
  }

  useEffect(() => {
    if (profileId === user.userId) {
      setProfileUser({
        ...user,
      });
      fetchPosts(user);
    } else {
      if (Object.keys(user.followReqs).includes(props.match.params.id)) {
        setPending(true)
      } else {
        setPending(false);
      }
      fetchUser().then((userData) => fetchPosts(userData));
    }

    async function fetchUser() {
      const doc = await database.users.doc(profileId).get();
      setProfileUser({
        ...doc.data(),
      });
      return doc.data();
    }

    function fetchPosts(userData) {
      let { postIds } = userData;
      let arr = [];
      for (let i = 0; i < postIds.length; i++) {
        let val = post.find((obj) => obj.postId === postIds[i]);
        if (val !== undefined) {
          arr.push(val);
        }
      }
      if (arr.length > 0) {
        setUserPosts(arr);
      }
    }
  }, [profileId, post, user]);

  return (
    <Container component="main" maxWidth="md">
      {profileUser === null ? (
        <Loader size={50} />
      ) : (
        <Grid
          ref={gridRef}
          className={classes.main}
          container
          direction="column"
          alignItems="center"
          onClick={handleClose}
        >
          <Grid item className={classes.submain}>
            <div className={classes.infoContainer}>
              <div className={classes.profileImage}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Avatar
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.purple}
                    alt={profileUser.displayName}
                    src={profileUser.profileUrl}
                  >
                    {profileUser.displayName.charAt(0)}
                  </Avatar>
                )}
                {profileId === user.userId && (
                  <IconButton
                    disabled={loading}
                    color="secondary"
                    className={classes.editIcon}
                    onClick={handleImageUpload}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </div>
              <div className={classes.userInfo}>
                <div className={classes.nameContainer}>
                  <Typography variant="h5">
                    {profileUser.displayName}
                  </Typography>
                  {profileId === user.userId && (
                    <Button
                      onClick={handleClick}
                      color="secondary"
                      variant="outlined"
                    >
                      Edit Profile
                    </Button>
                  )}
                  {profileId !== user.userId && (
                    <Button
                      onClick={handleFollow}
                      color={pending ? "default" : user.following.includes(profileId) ? "secondary" : "primary"}
                      variant={pending ? "outlined" : "contained"}
                      disabled={reqLoading}
                    >
                      {pending ? "pending" : user.following.includes(profileId) ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </div>
                <div>
                  {profileUser.bio && <Typography variant="body2">{profileUser.bio}</Typography>}
                  <hr />
                  {profileUser.location && (
                    <Fragment>
                      <div className={classes.location}>
                        <LocationOn color="primary" /> <span>{profileUser.location}</span>
                      </div>
                      <hr />
                    </Fragment>
                  )}
                  {profileUser.website && (
                    <Fragment>
                      <div className={classes.website}>
                        <LinkIcon color="primary" />
                        <a
                          href={profileUser.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profileUser.website}
                        </a>
                      </div>
                      <hr />
                    </Fragment>
                  )}
                </div>
                <div className={classes.postInfo}>
                  <Typography variant="h6">
                    {userPosts !== null ? userPosts.length : "0"} posts
                  </Typography>
                  <Typography variant="h6">{profileUser.followers.length} Followers</Typography>
                  <Typography variant="h6">{profileUser.following.length} Following</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item className={classes.submaintwo}>
            {!userPosts ? (
              <div className={classes.loader}>
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.postContainer}>
                {userPosts.map((obj) => (
                  <PostCard key={obj.postId} {...obj} />
                ))}
              </div>
            )}
          </Grid>
          <EditDetails open={open} setOpen={setOpen} profileId={profileId} />
          {show && <UploadImage user={user} setLoading={setLoading} setShow={setShow} />}
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
