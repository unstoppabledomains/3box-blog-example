import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const createTheme = (primary: string, secondary: string, background: string) =>
  createMuiTheme({
    typography: {
      fontFamily: "Merriweather",
    },
    palette: {
      type: "light",
      // parseInt(background.replace("#", ""), 16) > 0xffffff / 2
      //   ? "light"
      //   : "dark",
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      error: {
        main: "#d61e1e",
      },
      background: {
        default: background,
      },
    },
    overrides: {
      MuiButton: {
        // Name of the rule
        contained: {
          fontFamily: "OpenSans",
          fontSize: 16,
          fontWeight: "bold",
          borderRadius: 20,
          height: 40,
        },
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
      main: "#d61e1e",
    },
    background: {
      default: "#fff",
    },
  },
});

export default createTheme;
