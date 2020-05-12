import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(4),
      margin: theme.spacing(0, 2, 10),
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 0, 10),
      },
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
    },
    title: {
      wordBreak: "break-word",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3rem",
      },
    },
    dateAuthorRow: {},
    caption: {
      fontFamily: "OpenSans",
      fontSize: 14,
      wordBreak: "break-word",
    },
    description: {
      marginBottom: theme.spacing(4),
    },
    bodyContainer: {
      display: "flex",
      marginBottom: theme.spacing(4),
    },
    divider: {
      margin: theme.spacing(3, 0),
    },
    commentContainer: {
      display: "flex",
      flex: 1,
      paddingTop: theme.spacing(9),
      margin: theme.spacing(0, -4, -4),
      background: "#f7f7f7",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    comments: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 616,
      //   overflowX: "hidden",
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
