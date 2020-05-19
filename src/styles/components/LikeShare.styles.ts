import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // TODO: Put back when adding comments component
      //   marginBottom: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    leftButtons: {},
    likeButton: {
      borderRadius: 20,
      fontFamily: "OpenSans",
      fontSize: 16,
      height: 40,
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(2),
      },
    },
    shareRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        alignItems: "flex-start",
        flexDirection: "column",
      },
    },
    shareText: {
      fontFamily: "OpenSans",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing(2),
      },
    },
    icon: {},
    iconText: {
      textTransform: "none",
      marginLeft: theme.spacing(1),
      fontFamily: "OpenSans",
      fontSize: 16,
      color: theme.palette.secondary.main,
    },
  })
);
