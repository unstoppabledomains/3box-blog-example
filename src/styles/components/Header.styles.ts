import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
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
    },
  })
);
