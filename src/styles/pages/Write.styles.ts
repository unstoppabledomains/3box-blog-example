import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(4),
      margin: theme.spacing(0, 2, 10),
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
    },
    buttonRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(4),
    },
    draftPublishGroup: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      fontFamily: "OpenSans",
      fontWeight: "bold",
      fontSize: 16,
      margin: theme.spacing(3, 0, 1),
    },
    textField: {
      borderRadius: 0,
      width: "100%",
    },
    publishButton: {
      fontFamily: "OpenSans",
      height: 56,
      fontWeight: "bold",
      fontSize: 16,
      borderRadius: 28,
    },
    saveButton: {
      fontFamily: "OpenSans",
      fontWeight: 600,
      height: 56,
      fontSize: 16,
      borderRadius: 28,
    },
    destroyButton: {
      height: 56,
      fontFamily: "OpenSans",
      fontWeight: 600,
      color: theme.palette.error.main,
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      //   backgroundColor: "#d60000",
      //   "&:hover": {
      //     backgroundColor: "#9b0000",
      //   },
    },
  })
);
