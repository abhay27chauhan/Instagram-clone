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
    '&::-webkit-scrollbar': {
      display: "none"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));