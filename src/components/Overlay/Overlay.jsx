import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles'


export default function Overlay({ videoObj }) {
  const classes = useStyles();
  const linkToUserProfile = `/profile/${videoObj.userId}`

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover}>
        <video className={classes.video}  controls autoPlay muted>
            <source 
                src={videoObj.src} 
                type="video/mp4"
            >
            </source>
        </video>
      </CardMedia>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div style={{display: "flex"}}>
              <Avatar aria-controls="simple-menu" aria-haspopup="true" className={classes.purple} alt={videoObj.username} src={videoObj.profileUrl}>
                  {videoObj.username.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">   
                  <Link to={linkToUserProfile} >
                    {videoObj.username}
                  </Link>
              </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
