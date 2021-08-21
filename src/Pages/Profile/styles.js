import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
  },
  submain: {
    width: "100%",
    minHeight: "161px",
  },
  submaintwo: {
    width: "100%",
  },
  infoContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    gap: "2rem",
    padding: theme.spacing(2),
    borderBottom: "1px solid",
  },
  profileImage: {
    height: "100%",
    width: "31%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  editIcon: {
    position: "absolute",
    bottom: "-10px",
    right: "45px",
    '& svg': {
      fontSize: "1.7em"
    }
  },
  input: {
    display: "none",
  },
  purple: {
    width: "8rem",
    height: "8rem",
  },
  userInfo: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  },
  location: {
    display: "flex",
    width: "70px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  website: {
    display: "flex",
    width: "140px",
    alignItems: "center",
    gap: "0.7rem",
    '& a': {
      color: 'blue'
    }
  },
  nameContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postInfo: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
  loader: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));