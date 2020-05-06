import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(0, 4),
      margin: theme.spacing(0, 2, 10),
    },
    title: {
      fontFamily: "Merriweather",
      fontSize: 32,
      fontWeight: "bold",
      margin: 0,
    },
    buttonRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
    },
    draftPublishGroup: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      fontWeight: "bold",
      fontSize: 16,
      margin: theme.spacing(3, 0, 1),
    },
    textField: {
      borderRadius: 0,
      width: "100%",
    },
    button: {
      height: 56,
      fontWeight: "bold",
      fontSize: 16,
      borderRadius: 28,
    },
    destroyBtn: {
      backgroundColor: "#d60000",
      "&:hover": {
        backgroundColor: "#9b0000",
      },
      marginRight: theme.spacing(8),
    },
  })
);
