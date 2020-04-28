import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(6, 0),
    },
  })
);
