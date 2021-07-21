import React, { useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageIcon from "@material-ui/icons/Message";
import { useStyles } from './styles';
import { useStateValue } from "../../context/StateProvider";
import { database } from "../../firebase/firebase.utils";

function VideoSidebar(props) {
  const { state: { user, post } } = useStateValue()
  const [liked, setLiked] = useState(() => {
    for(let i=0; i<post.length; i++){
      if(post[i].postId === props.pid){
        if(post[i].likes.includes(user.userId)){
          return true;
        }
      }
    }
    return false;
  });
  const classes = useStyles();

  const handleLike = async () => {
    console.log("handle like")
    for(let i=0; i<post.length; i++){
      if(post[i].postId === props.pid){
        if(post[i].likes.includes(user.userId)){
            let likeArr = post[i].likes.filter(id => id !== user.userId)
            await database.posts.doc(props.pid).update({
              likes: likeArr
            })
        }else{
          await database.posts.doc(props.pid).update({
              likes: [...post[i].likes, user.userId]
          })
        }
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
          <FavoriteIcon fontSize="large" onClick={handleLike} />
        ) : (
          <FavoriteBorderIcon
            fontSize="large"
            onClick={handleLike}
          />
        )}
      </div>
      <div className={classes.button}>
        <MessageIcon fontSize="large" onClick={props.sendDateToOverlay} />
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