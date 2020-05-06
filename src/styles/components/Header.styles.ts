import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolBar: {
      maxWidth: 1000,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    title: {},
    avatarButton: {
      borderRadius: "100%",
      padding: theme.spacing(0.25),
      height: 56,
      width: 56,
    },
    leftContainer: {
      display: "flex",
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
    },
    rightContainer: {
      display: "flex",
      flex: 1,
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
      borderRadius: 20,
      height: 40,
    },
    bookmarksDivider: {
      color: theme.palette.primary.contrastText,
      margin: theme.spacing(0, 2),
    },
    bookmarksButton: {
      color: theme.palette.primary.contrastText,
    },
    menuIcon: {},
  })
);
