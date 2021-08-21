import React, { useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageIcon from "@material-ui/icons/Message";
import { useStyles } from './styles';
import { useStateValue } from "../../context/StateProvider";
import { database } from "../../firebase/firebase.utils";
import { Typography } from "@material-ui/core";

function VideoSidebar(props) {
  const { state: { user } } = useStateValue()
  const [liked, setLiked] = useState(() => {
    if(props.likes.includes(user.userId)){
        return true;
    }
    return false;
  });
  const classes = useStyles();

  const handleLike = async () => {
    console.log("handle like")
    if(props.likes.includes(user.userId)){
        let likeArr = props.likes.filter(id => id !== user.userId)
        await database.posts.doc(props.pid).update({
          likes: likeArr
        })
    }else{
      await database.posts.doc(props.pid).update({
          likes: [...props.likes, user.userId]
      })
      if(user.userId !== props.userId){
        await database.notifications.add({
          sender: user.userId,
          recipient: props.userId,
          createdAt: database.getUserTimeStamp(),
          type: "like",
          read: false,
          postId: props.pid
        })
      }
    }
    setLiked((preState) => {
      return !preState
    })
  }

  return (
    <div className={classes.videoSidebar}>
      <div className={classes.button}>
        {liked ? (
          <div>
            <FavoriteIcon fontSize="large" onClick={handleLike} />
            <Typography variant="body2" component="p">
              {props.likes.length}
            </Typography>
          </div>
        ) : (
          <div>
            <FavoriteBorderIcon
              fontSize="large"
              onClick={handleLike}
            />
            <Typography variant="body2" component="p">
              {props.likes.length}
            </Typography>
          </div>
        )}
      </div>
      <div className={classes.button}>
        <MessageIcon fontSize="large" onClick={props.sendDateToOverlay} />
        <Typography variant="body2" component="p">
          {props.comments.length}
        </Typography>
      </div>
      <div className={classes.button}>
          <img
            className={classes.record}
            src="https://static.thenounproject.com/png/934821-200.png"
            alt=""
          />
      </div>
    </div>
  );
}

export default VideoSidebar;