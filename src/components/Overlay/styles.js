import { makeStyles } from "@material-ui/core";
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "65%",
    width: "60%",
    position: "absolute"
  },
  details: {
    width: "60%",
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    height: "100%"
  },
  cover: {
    width: "40%",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  video:{
    height: "100%",
    width: "100%"
  },
  purple: {
    marginRight: theme.spacing(2),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  showComment: {
    marginTop: theme.spacing(3),
    borderTop: "1px solid black",
    padding: theme.spacing(2),
    height: "73%",
    overflow: "auto"
  },
  comment: {
    display: "flex",
    padding: theme.spacing(1),
    height: "10%",
  },
  cbtn:{      
    marginTop: '5%'
  },
  commentDiv: {
    maxWidth: "100%",
    display: "flex",
    margin: "2%",
  },
  da:{
      marginRight:'2%',
      marginTop:'2%'
  }
}));