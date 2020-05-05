import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(0, 2, 1),
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
      // TODO: font
      fontFamily: "Merriweather",
      fontSize: 32,
      fontWeight: "bold",
      wordWrap: "break-word",
    },
    dateAuthorRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(3),
    },
    caption: {},
    description: {},
    readButton: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(4),
      width: 158,
      borderRadius: 25,
      fontSize: 16,
    },
  })
);
