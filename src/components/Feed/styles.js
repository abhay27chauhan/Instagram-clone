import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  input:{
    display: 'none'
  },
  file: {
    margin: theme.spacing(2, 2, 1),
  },
  video: {
    marginBottom: "6rem",
    
  },
  btnContainer:{
    position: "fixed",
    left: 0,
    top: 65,
  },
  videoContainer:{
    marginTop: theme.spacing(13)
  }
}));