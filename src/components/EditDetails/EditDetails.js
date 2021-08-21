import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { database } from "../../firebase/firebase.utils";

import {useStyles} from './styles';

function EditDetails({ open, setOpen, profileId}) {
  const [userDetails, setUserDetails] = useState({
    bio: "",
    website: "",
    location: "",
  });
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setOpen(false);

      try{
        await database.users.doc(profileId).update({
          bio: userDetails.bio,
          location: userDetails.location,
          website: userDetails.website
        })
      }catch(err){
        console.log(err.message);
        alert("unable to update " + err.message)
      }

  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit your details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            name="bio"
            type="text"
            label="Bio"
            multiline
            rows="3"
            placeholder="A short bio about yourself"
            className={classes.textField}
            value={userDetails.bio}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="website"
            type="text"
            label="Website"
            placeholder="Your personal/professinal website"
            className={classes.textField}
            value={userDetails.website}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="location"
            type="text"
            label="Location"
            placeholder="Where you live"
            className={classes.textField}
            value={userDetails.location}
            onChange={handleChange}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDetails
