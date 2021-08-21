import React, { useEffect, useRef, useState } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core';
import uuid from 'react-uuid';

import { useStateValue } from '../../context/StateProvider';
import { database, storage } from '../../firebase/firebase.utils';
import useStyles from './styles';
import Header from '../../components/Header/Header'
import Video from '../../components/Video/Video';
import Overlay from '../../components/Overlay/Overlay';
import Form from '../../components/Form/Form';

function Feed() {
    const [Loading, setLoading] = useState(false);
    const [video, setVideo] = useState({})
    const [show, setShow] = useState(false)
    const feedRef = useRef(null)
    const { state: { user, post } } = useStateValue()

    const classes = useStyles();

    const openOverlay = (videoObject) => {
        setVideo(videoObject)
        setShow(true)
    }

    const closeOverlay = (e) => {
        if(e.target === feedRef.current){
            setVideo({});
            setShow(false);
        }
    }

    const handleSubmit = (postInfoObj, setPostData) => {
      if (!postInfoObj.selectedFile) {
        alert(
          "No Post is selected. Either you have not selected any file or the file size is too big. Please try again!!"
        );
        return;
      }
      let pid = uuid();
      let { selectedFile } = postInfoObj;
      setLoading(true);
      const uploadTaskListener = storage.ref(`/posts/${pid}`).put(selectedFile);

      // fn1 -> progress
      // fn2 -> error
      // fn3-> success
      uploadTaskListener.on("state_changed", fn1, fn2, fn3);

      function fn1(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        alert("There was an error in uploading the file ", error.message);
        return;
      }
      async function fn3() {
        // link get
        let downloadurl =
          await uploadTaskListener.snapshot.ref.getDownloadURL();

        let postObj = {
          comments: [],
          likes: [],
          song: postInfoObj.title,
          message: postInfoObj.message,
          downloadurl,
          auid: user.userId,
          postId: pid,
          createdAt: database.getUserTimeStamp(),
        };

        console.log("setting post....");
        await database.posts.doc(pid).set(postObj);

        console.log("updating user....");

        await database.users.doc(user.userId).update({
          postIds: [...user.postIds, pid],
        });

        console.log("setting loading to false....");
        setPostData({ title: "", message: "", selectedFile: "" });
        // setLoading(false);
      }
    };
    const callback = async entries => {
        entries.forEach(element => {
            let el = element.target.childNodes[0];
            // el.play is asynchronous
            el.play().then(() => {

                if ( !el.paused && element.isIntersecting != true) {
                    el.pause();
                }
            })
        });
    };

    const observer = new IntersectionObserver(callback, {
        root: null,
        threshold: 0.9,
    });

    useEffect(() => {
        if (typeof window == 'object') {
            let elements = document.querySelectorAll('.videos')
            elements.forEach(el => {
                observer.observe(el);
            })

            if(Loading){
                setLoading(false);
            }
            
            return () =>{
                observer.disconnect();
            } 
        }
    }, [post]);

    return (
            <div>
                <Header />
                <div className={classes.formContainer}>
                    <Form handleSubmit={handleSubmit} />
                </div>
                <div ref={feedRef} className={classes.feedContainer} onClick={closeOverlay}>
                    <div className={classes.videoContainer}>
                        {
                            post.map((obj, i) => (
                                <Video
                                    key={obj.postId}
                                    {...obj}
                                    handleOverlay={openOverlay}
                                >
                                </Video>
                            ))
                        }
                    </div>
                    {show && <Overlay videoObj={video} />}
                </div>
                <Backdrop className={classes.backdrop} open={Loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            )
}

export default Feed;
