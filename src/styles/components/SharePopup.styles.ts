import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      padding: theme.spacing(4),
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
    },
    twitter: {
      backgroundColor: "#2aa3ef",
      marginLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#2aa3ef80 !important",
      },
    },
    linkedIn: {
      backgroundColor: "#1178b3",
      marginLeft: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#1178b380 !important",
      },
    },
  })
);
