import { useState } from "react";
import { TextField, Button, Typography, Paper, Input } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";

import useStyles from "./styles";

function Form({ handleSubmit }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();

  const clear = () => {
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let file = e?.target?.files[0];
    if (file != null) {
      console.log("file ", file);
    } else {
      return;
    }

    if (file.size / (1024 * 1024) > 20) {
      alert("The selected file is very big");
      return;
    }

    setPostData({ ...postData, selectedFile: file})
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={() => handleSubmit(postData)}
      >
        <Typography variant="h6">Creating a Reel</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Song"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <label htmlFor="contained-button-file">
            <Input
              className={classes.input}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <Button
              fullWidth
              startIcon={<BackupIcon />}
              color="secondary"
              variant="outlined"
              component="span"
            >
              Upload
            </Button>
          </label>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
