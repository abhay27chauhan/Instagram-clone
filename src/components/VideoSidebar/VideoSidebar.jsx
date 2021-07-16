import React, { useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageIcon from "@material-ui/icons/Message";
import { useStyles } from './styles';

function VideoSidebar() {
  const [liked, setLiked] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.videoSidebar}>
      <div className={classes.button}>
        {liked ? (
          <FavoriteIcon fontSize="large" onClick={(e) => setLiked(false)} />
        ) : (
          <FavoriteBorderIcon
            fontSize="large"
            onClick={(e) => setLiked(true)}
          />
        )}
      </div>
      <div className={classes.button}>
        <MessageIcon fontSize="large" />
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