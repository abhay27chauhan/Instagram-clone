import React from 'react'
import { Button, Input } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import uuid from 'react-uuid';

import { useStateValue } from '../../context/StateProvider';
import { database, storage } from '../../firebase/firebase.utils';
import useStyles from './styles';
import Header from '../Header/Header'
import Video from '../Video/Video';

function Feed() {
    const classes = useStyles();
    const { state: { user, post } } = useStateValue()

    const handleFileChange = (e) => {
        e.preventDefault();
        let file = e?.target?.files[0];
        if(file != null){
            console.log("file ", file)
        }

        if (file.size / (1024 * 1024) > 20) {
            alert("The selected file is very big");
            return;
        }
        
        let pid = uuid();
        const uploadTaskListener = storage.ref(`/posts/${pid}`).put(file);

        // fn1 -> progress
        // fn2 -> error 
        // fn3-> success
        uploadTaskListener.on('state_changed', fn1, fn2, fn3);

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
            let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL();

            let postObj = {
                comments: [],
                likes: [],
                downloadurl,
                auid: user.userId,
                createdAt: database.getUserTimeStamp(),
            }

            await database.posts.doc(pid).set(postObj)

            await database.users.doc(user.userId).update({
                postIds: [...user.postIds, pid]
            })
        }
    }
    return (
            <div>
                {console.log("user ", user)}
                <Header />
                <div className={classes.btnContainer}>
                    <label htmlFor="contained-button-file">
                        <Input className={classes.input} accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                        <Button startIcon={<BackupIcon />} color="secondary" variant="outlined" component="span" className={classes.file}>
                            Upload
                        </Button>
                    </label>
                </div>
                <div className={classes.feedContainer}>
                    <div className={classes.videoContainer}>
                        {
                            post.map((obj, i) => (
                                <Video
                                    key={i}
                                    src={obj.downloadurl}
                                    id={obj.pid}
                                    username={obj.user}
                                    profileUrl = {obj.profileUrl}
                                    userId={obj.auid}
                                >
                                </Video>
                            ))
                        }
                    </div>
                </div>
            </div>
            )
}

export default Feed;
