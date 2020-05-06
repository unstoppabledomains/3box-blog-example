import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(1),
      padding: theme.spacing(4),
      maxWidth: 960,
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1),
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      wordWrap: "break-word",
    },
    dateAuthorRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(3),
    },
    caption: {
      fontFamily: "OpenSans",
      fontSize: 14,
    },
    description: {},
    buttonRow: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(4),
    },
    containedButton: {
      display: "flex",
      alignItems: "center",
      width: 158,
      borderRadius: 25,
      fontSize: 16,
    },
    destroyButton: {
      color: theme.palette.error.main,
      borderRadius: 25,
      fontSize: 16,
    },
  })
);
