import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    main: {
        height: "100%",
    },
    submain: {
        width: "100%",
        height: "20%",
    },
    submaintwo: {
        height: "80%",
        width: "100%"
    },
    infoContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "2rem"
    },
    profileImage: {
        height: "100%",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    purple: {
        width: "8rem",
        height: "8rem"
    },
    userInfo: {
        width: "50%"
    },
    postContainer: {
        height: "100%",
        width: "100%",
        borderTop: "1px solid black"
    }
}));