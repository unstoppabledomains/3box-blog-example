import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { getThemeType } from "utils/createTheme";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontFamily: "OpenSans",
      fontSize: 40,
      marginBottom: theme.spacing(4),
      color:
        getThemeType(theme.palette.background.default) === "dark"
          ? "#FFF"
          : theme.palette.text.primary,
    },
    center: {
      height: "50vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
