import React from "react";

import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Ticker from "react-ticker";
import { useStyles } from './styles';
import { Avatar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function VideoFooter(props) {
    const classes = useStyles();
    const linkToUserProfile = `/profile/${props.userId}`
  return (
    <div className={classes.videoFooter}>
      <div className={classes.text}>
        <div style={{display: "flex"}}>
            <Avatar aria-controls="simple-menu" aria-haspopup="true" className={classes.purple} alt={props.username} src={props.profileUrl}>
                {props.username.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">   
                <Link to={linkToUserProfile} style={{color: "white"}}>
                  {props.username}
                </Link>
            </Typography>
        </div>
        <p>{props.description || "description of video"}</p>
        <div className={classes.ticker}>
          <MusicNoteIcon className={classes.icon} />
          <Ticker mode="smooth">
            {({ index }) => (
              <>
                <p>{props.song || "song"}</p>
              </>
            )}
          </Ticker>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;