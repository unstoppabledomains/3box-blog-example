import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(4, 2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        padding: theme.spacing(5, 10, 9),
      },
    },
    logosContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {},
    creditContainer: {},
    creditText: {
      color: theme.palette.primary.contrastText,
    },
  })
);
