import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginRight: theme.spacing(-1),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    icon: {
      padding: `${theme.spacing(1)}px !important`,
      marginLeft: theme.spacing(1),
    },
  })
);
