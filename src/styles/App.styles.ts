import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // TODO: improve height calc
      // TODO: get rid of bottom space
      minHeight: `calc(100vh - (64px + 163px))`, // 100vh - (header + footer)
      maxWidth: 960,
      paddingTop: theme.spacing(4),
      marginRight: "auto",
      marginLeft: "auto",
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vh",
      overflow: "hidden",
    },
  })
);
