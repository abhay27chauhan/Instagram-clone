import React, { useRef, useState } from 'react';
import VideoFooter from '../VideoFooter/VideoFooter';
import VideoSidebar from '../VideoSidebar/VideoSidebar';
import { useStyles } from './styles';

export default function Video(props) {
    const [playing, setPlaying] = useState(true)
    const videoRef = useRef(null);

    const classes = useStyles();

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    }

    const sendDataToOverlay = () => {
        let videoObject = {
            src: props.src,
            userId: props.userId,
            profileUrl: props.profileUrl,
            username: props.username,
        }
        videoRef.current.pause();
        setPlaying(false);
        props.handleOverlay(videoObject);
    }

    return (
        <div className={classes.root}>
            <video className={classes.video}  onClick={onVideoPress} ref={videoRef} autoPlay loop muted id={props.id}>
                <source 
                    src={props.src} 
                    type="video/mp4"
                >
                </source>
            </video>
            <VideoFooter userId={props.userId} profileUrl={props.profileUrl} username={props.username} />
            <VideoSidebar pid = {props.id} sendDateToOverlay={sendDataToOverlay} />
        </div>
    )
}
