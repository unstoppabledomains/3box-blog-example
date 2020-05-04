import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const createTheme = (primary: string, secondary: string, background: string) =>
  createMuiTheme({
    palette: {
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
      // TODO: TEXT?
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
