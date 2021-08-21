import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './styles'
import CustomInput from '../Input/Input';
import { database } from '../../firebase/firebase.utils';
import { useStateValue } from '../../context/StateProvider';
import Loader from '../Loader/Loader';


export default function Overlay({ videoObj }) {
  const [comment, setComment] = useState('');
  const [userComments, setUserComments] = useState(null);
  const classes = useStyles();
  const { state: { user, post } } = useStateValue()
  const linkToUserProfile = `/profile/${videoObj.userId}`

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  async function handleOnEnter () {
    let obj = {
        text:comment,
        username: user.displayName,
        profileUrl: user.profileUrl,    
    }

    const postData = post.find(p => p.postId === videoObj.postId)

    try{
      let docRef = await database.comments.add(obj)
      await database.posts.doc(videoObj.postId).update({
          comments: [...postData.comments, docRef.id]
      })
      if(user.userId !== videoObj.username){
        await database.notifications.add({
          sender: user.userId,
          recipient: videoObj.username,
          createdAt: database.getUserTimeStamp(),
          type: "comment",
          read: false,
          postId: videoObj.postId
        })
      }
    }catch(err){
      console.log(err.message)
    }
    setComment('')
  }

  useEffect(() => {
    const postData = post.find(p => p.postId === videoObj.postId);
    let comments = postData.comments;
    async function getComments(comments){
      let arr = []
      for(let i=comments.length-1; i>=0; i--){
        let doc = await database.comments.doc(comments[i]).get()
        arr.push({
          ...doc.data()
        })
      }
      setUserComments(arr);
    }
    if(comments.length > 0){
      getComments(comments)
    }
  }, [post])

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
          <div style={{display: "flex", height: "10%", width: "100%"}}>
              <Avatar aria-controls="simple-menu" aria-haspopup="true" className={classes.purple} alt={videoObj.username} src={videoObj.profileUrl}>
                  {videoObj.username.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">   
                  <Link to={linkToUserProfile} >
                    {videoObj.username}
                  </Link>
              </Typography>
          </div>
          <div className={classes.showComment}>
            {
              userComments==null ? <Loader size={40}/>
              :
              userComments.map((comment,index) => (
                <div key={index} className={classes.commentDiv}>
                    <Avatar src={comment.profileUrl} className={classes.da} />
                    <p><span style={{fontWeight:'bold',display:'inline-block'}}>{comment.username}</span>&nbsp;&nbsp;{comment.text}</p>
                </div>
              ))
            }
          </div>
          <div className={classes.comment}>
            <CustomInput name="comment" value={comment} label="Comment" handleChange={handleChange} type="text" autoFocus />
            <Button onClick={handleOnEnter} disabled={comment === '' ? true:false} className={classes.cbtn} color="primary">Post</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
