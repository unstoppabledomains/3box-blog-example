import { createMuiTheme } from "@material-ui/core/styles";

export const getThemeType = (color: string) =>
  parseInt(color.replace("#", ""), 16) > 0xffffff / 2 ? "light" : "dark";

const createTheme = (primary: string, secondary: string, background: string) =>
  createMuiTheme({
    typography: {
      fontFamily: "Merriweather",
    },
    palette: {
      type: "light",
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
        contained: {
          fontFamily: "OpenSans",
          fontSize: 16,
          fontWeight: "bold",
          borderRadius: 20,
          height: 40,
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 0,
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: 40,
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
