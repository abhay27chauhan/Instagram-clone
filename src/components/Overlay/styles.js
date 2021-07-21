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
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "44%",
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
}));