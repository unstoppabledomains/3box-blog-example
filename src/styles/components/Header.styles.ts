import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolBar: {
      maxWidth: 1000,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    title: {
      flexGrow: 1,
    },
    avatarButton: {
      borderRadius: "100%",
      padding: theme.spacing(0.25),
      height: 56,
      width: 56,
    },
  })
);
