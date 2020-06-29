import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.common.white,
    },
    paper: {
      margin: 0,
    },
    modalContent: {
      backgroundColor: "rgba(17, 51, 83, 0.02)",
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      minWidth: 600,
    },
    modalHeader: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    modalTitle: {
      fontWeight: "bold",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    modalCloseIcon: {
      padding: 0,
    },
    providerColumn: {
      display: "flex",
      flexDirection: "column",
    },
    providerButton: {
      fontWeight: "bold",
      fontSize: 16,
      height: 56,
      textTransform: "none",
      marginTop: theme.spacing(2),
      borderRadius: 6,
    },
  })
);
