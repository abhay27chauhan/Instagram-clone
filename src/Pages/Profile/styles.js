import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
    },
    main: {
        height: "100%",
    },
    submain: {
        width: "100%",
        height: "161px",
    },
    submaintwo: {
        minHeight: "calc(100vh - 161px)",
        width: "100%"
    },
    infoContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "2rem",
        padding: theme.spacing(2),
        borderBottom: "1px solid"
    },
    profileImage: {
        height: "100%",
        width: "31%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    purple: {
        width: "8rem",
        height: "8rem"
    },
    userInfo: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "15px"
    },
    postInfo: {
        display: "flex",
        "justifyContent": "space-between",

    },
    postContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4)
    },
    loader: {
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));