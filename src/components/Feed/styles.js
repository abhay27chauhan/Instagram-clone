import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  input:{
    display: 'none'
  },
  file: {
    margin: theme.spacing(2, 2, 1),
  },
  btnContainer:{
    position: "fixed",
    left: 0,
    top: 65,
  },
  feedContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  videoContainer:{
    position: "relative",
    height: "100%",
    width: "80%",
    maxWidth: "500px",
    overflow: "scroll",
    paddingTop: theme.spacing(12),
    '&::-webkit-scrollbar': {
      display: "none"
    }
  }
}));