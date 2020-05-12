import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      padding: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        padding: theme.spacing(2),
      },
    },
    shareText: {
      fontFamily: "OpenSans",
      fontWeight: "bold",
      fontSize: 24,
      maxWidth: 122,
    },
    facebook: {
      backgroundColor: "#4469b0",
      marginLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#4469b080 !important",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        marginBottom: theme.spacing(1.5),
      },
    },
    twitter: {
      backgroundColor: "#2aa3ef",
      marginLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#2aa3ef80 !important",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        marginBottom: theme.spacing(1.5),
      },
    },
    linkedIn: {
      backgroundColor: "#1178b3",
      marginLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#1178b380 !important",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        marginBottom: theme.spacing(1.5),
      },
    },
  })
);
