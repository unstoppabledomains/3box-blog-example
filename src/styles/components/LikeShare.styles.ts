import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
    },
    leftButtons: {},
    likeButton: {
      borderRadius: 20,
      fontFamily: "OpenSans",
      fontSize: 16,
      height: 40,
    },
    shareRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    shareText: {
      fontFamily: "OpenSans",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: theme.spacing(1),
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
