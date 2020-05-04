import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const createTheme = (primary: string, secondary: string, background: string) =>
  createMuiTheme({
    palette: {
      type:
        parseInt(background.replace("#", ""), 16) > 0xffffff / 2
          ? "light"
          : "dark",
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      error: {
        main: red.A400,
      },
      background: {
        default: background,
      },
    },
  });

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default createTheme;
