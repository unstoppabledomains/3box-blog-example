import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    textArea: {
      outline: "none",
    },
    root: {
      "&:hover": {
        outline: `1px solid ${theme.palette.primary.main}`,
        borderColor: "rgba(0,0,0,0)",
      },
      "&:focus-within": {
        outline: `2px solid ${theme.palette.primary.main}`,
        borderColor: "rgba(0,0,0,0)",
      },
    },
  })
);
