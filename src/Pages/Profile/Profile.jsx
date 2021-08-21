import React, { useEffect, useState, Fragment } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import { useStateValue } from "../../context/StateProvider";
import { database, storage } from "../../firebase/firebase.utils";
import Loader from "../../components/Loader/Loader";
import { useStyles } from "./styles";
import PostCard from "../../components/PostCard/PostCard";
import EditDetails from "../../components/EditDetails/EditDetails";

function Profile(props) {
  const classes = useStyles();
  const {
    state: { user, post },
  } = useStateValue();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const profileId = props.match.params.id;

  const handleClick = () => {
    setOpen(true);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let file = e?.target?.files[0];
    if (file != null) {
      console.log("file ", file);
      setLoading(true);
    } else {
      return;
    }
    storage
      .ref()
      .child("users")
      .child(user.userId)
      .child(file.name)
      .put(file)
      .then((response) => response.ref.getDownloadURL())
      .then((photoURL) =>
        database.users.doc(user.userId).update({ profileUrl: photoURL })
      )
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        alert("error occured " + err.message);
      });
  };

  useEffect(() => {
    if (profileId === user.userId) {
      setProfileUser({
        ...user,
      });
      fetchPosts(user);
    } else {
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
          className={classes.main}
          container
          direction="column"
          alignItems="center"
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
                {profileId === user.userId &&(
                  <label htmlFor="contained-button-file">
                    <Input
                      className={classes.input}
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleFileChange}
                    />
                    <IconButton
                      disabled={loading}
                      component="span"
                      color="secondary"
                      className={classes.editIcon}
                    >
                      <EditIcon />
                    </IconButton>
                  </label>
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
                  <Typography variant="h6">0 Followers</Typography>
                  <Typography variant="h6">0 Following</Typography>
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
        </Grid>
      )}
    </Container>
  );
}

export default Profile;
