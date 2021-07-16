import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  videoFooter: {
    position: "absolute",
    color: "white",
    bottom: "20px",
    left: "54px",
    marginLeft: "40px",
    display: "flex"
  },
  ticker: {
    '& .ticker': {
      top: "-14px",
      left: "10px"
    }
  },
  text: {
    flexGrow: 1,
    '& p': {
        paddingBottom: "10px"
    },
  },
  icon: {
    position: "absolute",
    left: "-9px",
  },
  purple: {
    marginRight: theme.spacing(2),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  }
}));