import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    root: {
        width: "30%",
        minHeight: "68px",
        padding: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    alignBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: theme.spacing(2),
    },
    uploadImge:{
        width: "100%",
        display: "none"
    }
}));