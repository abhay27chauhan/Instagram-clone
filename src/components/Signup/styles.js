import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  tc: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input:{
    display: 'none'
  },
  file: {
    margin: theme.spacing(2, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));