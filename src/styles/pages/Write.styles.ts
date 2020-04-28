import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 1200,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    title: {
      fontSize: 36,
    },
    buttonRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
    },
    textField: {
      marginBottom: theme.spacing(2),
    },
    button: {
      height: 56,
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },
    destroyBtn: {
      backgroundColor: "#d60000",
      "&:hover": {
        backgroundColor: "#9b0000",
      },
      marginRight: theme.spacing(8),
    },
    saveBtn: {
      backgroundColor: "#28a745",
      "&:hover": {
        backgroundColor: "#007717",
      },
    },
  })
);
