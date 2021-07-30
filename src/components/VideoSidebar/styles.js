import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  videoSidebar: {
    position: "absolute",
    top: "55%",
    right: "62px",
    color: "white"
  },
  button: {
    padding: "20px",
    textAlign: "center"
  },
  record: {
    animation: "$spinTheRecord infinite 5s linear",
    height: "50px",
    filter: "invert(1)",
  },
  "@keyframes spinTheRecord": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
}));