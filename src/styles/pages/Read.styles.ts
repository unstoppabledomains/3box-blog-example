import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 800,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(2),
    },
    title: {},
    author: {},
    description: {},
    bodyContainer: {
      display: "flex",
      marginBottom: theme.spacing(4),
    },
    commentContainer: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 616,
      overflowX: "hidden",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
    },
  })
);
