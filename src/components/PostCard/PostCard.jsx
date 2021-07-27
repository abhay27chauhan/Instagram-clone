import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { useStyles } from './styles'

export default function PostCard(props) {
  const classes = useStyles();

  const handlePlay = (e) => {
    e.currentTarget.children[0].play();
  }

  const handlePause = (e) => {
    e.currentTarget.children[0].pause();
  }

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} onMouseOver={handlePlay} onMouseOut={handlePause}>
        <video className={classes.video} src={props.downloadurl} type="video/mp4" muted>
        </video>
      </CardMedia>
    </Card>
  );
}