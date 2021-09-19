import React, { useState, useRef } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {
    Button,
    Input
  } from "@material-ui/core";

import { database, storage } from "../../firebase/firebase.utils";
import { useStyles } from "./styles";

export default function UploadImage({user, setLoading, setShow}) {
    const [file, setFile] = useState(null);
    const classes = useStyles();
    const imgRef = useRef(null)

    const handleFileChange = (e) => {
        e.preventDefault();
        let file = e?.target?.files[0];
        if (file != null) {
            console.log("file ", file);
            let src = URL.createObjectURL(e.target.files[0]);
            imgRef.current.src = src;
            console.log(imgRef.current)
            imgRef.current.style.display = "block";
            setFile(file);
        } else {
            return;
        }
    };

    const uploadFile = () => {
        setLoading(true);
        setShow(false);

        console.log("uploading file...");
        storage
            .ref()
            .child("users")
            .child(user.userId)
            .child(file.name)
            .put(file)
            .then((response) => response.ref.getDownloadURL())
            .then((photoURL) =>
                database.users.doc(user.userId).update({ profileUrl: photoURL })
            )
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                alert("error occured " + err.message);
            });
    }
    return (
        <Card className={classes.root}>
            <div>
                <img ref={imgRef} className={classes.uploadImge}  />
            </div>
            <CardActions className={classes.alignBtn}>
                <label htmlFor="contained-button-file">
                    <Input className={classes.input} accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange}/>
                    <Button color="primary" variant="contained" component="span">
                        Upload
                    </Button>
                </label>

                <Button color="secondary" disabled={!file} variant="contained" onClick={uploadFile}>
                    submit
                </Button>
            </CardActions>
        </Card>
    );
}