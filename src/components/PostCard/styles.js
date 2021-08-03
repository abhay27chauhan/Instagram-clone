import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "390px",
    width: "30%",
    minWidth: "240px"
  },
  cover: {
    width: "100%",
    height: "100%"
  },
  video:{
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }
}));