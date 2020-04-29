import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(6, 0),
    },
    footerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    socialRow: {
      display: "flex",
    },
    socialIcon: {
      margin: theme.spacing(0, 1),
    },
    divider: {
      width: "100%",
      maxWidth: 400,
    },
  })
);
