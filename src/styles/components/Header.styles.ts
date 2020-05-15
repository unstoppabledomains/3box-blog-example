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
      minHeight: "72px !important",
    },
    title: {
      fontFamily: "Merriweather !important",
      fontSize: "36px !important",
      fontWeight: "900 !important" as any,
      lineHeight: "1.2 !important",
      paddingBottom: 2,
      marginRight: `${theme.spacing(2)}px !important`,
      "&:hover": {
        cursor: "pointer !important",
      },
    },
    logo: {
      maxHeight: 68,
      height: 68,
      width: "auto",
      marginRight: theme.spacing(2),
      "&:hover": {
        cursor: "pointer !important",
      },
    },
    // Standard Header
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
      margin: `${theme.spacing(1)}px !important`,
    },
    bookmarksButton: {
      color: `${theme.palette.primary.contrastText} !important`,
      fontFamily: "OpenSans !important",
      fontWeight: "bold !important" as any,
      fontSize: "16px !important",
      marginLeft: "8px !important",
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
    // MobileHeader
    mobileRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    menuButton: {},
    drawer: {},
    mobileButton: {},
    socialHeader: {
      ...theme.typography.body1,
      fontWeight: "bold",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(-1),
    },
  })
);
