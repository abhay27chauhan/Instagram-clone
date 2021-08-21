import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import VideoFooter from "../VideoFooter/VideoFooter";
import VideoSidebar from "../VideoSidebar/VideoSidebar";
import { useStyles } from "./styles";

export default function Video(props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const classes = useStyles();

  const onVideoPress = (e) => {
    if (e.currentTarget !== videoRef.current) {
      return;
    }
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const sendDataToOverlay = () => {
    let videoObject = {
      src: props.downloadurl,
      userId: props.auid,
      profileUrl: props.profileUrl,
      username: props.user,
      postId: props.postId,
    };
    videoRef.current.pause();
    setPlaying(false);
    props.handleOverlay(videoObject);
  };

  const handleAutoScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
      e.target.muted = true;
      next.children[0].play();
    } else {
      ReactDOM.findDOMNode(e.target).parentNode.parentNode.scrollTo(0, 0);
    }
  };

  return (
    <div className={`${classes.root} videos`}>
      <video
        onEnded={handleAutoScroll}
        className={classes.video}
        onClick={onVideoPress}
        ref={videoRef}
        id={props.id}
        muted
        autoPlay
      >
        <source src={props.downloadurl} type="video/mp4"></source>
      </video>
      <VideoFooter
        userId={props.auid}
        description={props.message}
        song={props.song}
        profileUrl={props.profileUrl}
        username={props.user}
      />
      <VideoSidebar
        userId={props.auid}
        pid={props.postId}
        likes={props.likes}
        comments={props.comments}
        sendDateToOverlay={sendDataToOverlay}
      />
    </div>
  );
}
