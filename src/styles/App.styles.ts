import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: `calc(100vh - (64px + 163px))`, // 100vh - (header + footer)
      height: "fit-content",
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: `calc(100vh - (64px + 163px))`, // 100vh - (header + footer)
      width: "100%",
    },
    initContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vh",
      overflow: "hidden",
    },
  })
);
