import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginRight: theme.spacing(-1.5),
    },
    icon: {
      marginLeft: theme.spacing(2),
    },
  })
);
