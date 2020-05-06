import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: `calc(100vh - (64px + 163px))`, // 100vh - (header + footer)
      maxWidth: 960,
      padding: theme.spacing(4, 2),
      marginTop: theme.spacing(9),
      marginRight: "auto",
      marginLeft: "auto",
    },
    loadingContainer: {
      marginRight: "auto",
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "97vh",
      overflow: "hidden",
    },
  })
);
