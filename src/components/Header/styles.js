import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar:{
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
  },
  sectionDesktop: {
     display: 'flex',
  },
  purple: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  }
}));