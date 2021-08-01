import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  tc: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  carContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "95%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "98%",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imgcar: {
    width: "441px",
    height: "590px",
    position: "relative",
  },
  caro: {
    height: "423px",
    width: "241px",
    position: "absolute",
    left: "143px",
    top: "93px",
  },
}));