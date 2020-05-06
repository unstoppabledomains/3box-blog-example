import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(5, 0, 10),
      padding: theme.spacing(0, 4),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 36,
      height: 72,
    },
    arrowButton: {
      borderRadius: 36,
      fontFamily: "OpenSans",
      fontWeight: 600,
    },
  })
);
