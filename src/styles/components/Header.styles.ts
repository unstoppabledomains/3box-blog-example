import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 72,
    },
    toolBar: {
      maxWidth: 1000,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    title: {
      fontFamily: "Merriweather",
      fontSize: 36,
      fontWeight: 900,
      marginRight: theme.spacing(2),
      "&:hover": {
        cursor: "pointer",
      },
    },
    avatarButton: {
      borderRadius: "100%",
      padding: theme.spacing(0.25),
      height: 56,
      width: 56,
    },
    leftContainer: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
    },
    rightContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    socialRow: {
      marginRight: theme.spacing(1),
    },
    socialIcon: {
      padding: `${theme.spacing(1)}px !important`,
    },
    headerButton: {
      width: 136,
    },
    bookmarksDivider: {
      backgroundColor: `${theme.palette.primary.contrastText} !important`,
      margin: `${theme.spacing(1)} !important`,
    },
    bookmarksButton: {
      color: theme.palette.primary.contrastText,
      fontFamily: "OpenSans",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: theme.spacing(1),
    },
    menuItem: {
      fontWeight: 600,
      fontFamily: "OpenSans",
    },
    menuIcon: {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(1),
    },
    menuDivider: {
      margin: `0px ${theme.spacing(1)}px !important`,
    },
  })
);
