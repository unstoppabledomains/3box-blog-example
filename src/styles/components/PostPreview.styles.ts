import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      //   maxWidth: ???
    },
    date: {},
    title: {},
    description: {},
    readButton: {
      marginTop: theme.spacing(1),
      maxWidth: 200,
      borderRadius: 25,
    },
  })
);
