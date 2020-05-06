import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: theme.spacing(2),
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
      flexDirection: "column",
    },
    title: {},
    center: {
      height: "50vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
