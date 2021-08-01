import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formContainer:{
    position: "fixed",
    left: 43,
    top: 110,
    width: "371px"
  },
  feedContainer: {
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "64px"
  },
  videoContainer:{
    position: "relative",
    height: "100%",
    width: "80%",
    maxWidth: "500px",
    overflow: "scroll",
    paddingTop: "25px",
    scrollSnapType: "y mandatory",
    '&::-webkit-scrollbar': {
      display: "none"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));