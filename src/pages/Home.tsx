import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PreviewCard from "components/PreviewCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost } from "types/blog";
import { getPosts } from "services/blogActions";
import appContext from "services/appContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      maxWidth: "100%",
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

const Home: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);

  const initData = async () => {
    console.log("log from /home");
    const _posts = await getPosts({ state, dispatch })();
    setPosts(_posts);

    console.log(_posts);

    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    void initData();
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        posts.map((post: BlogPost, index: number) => (
          <PreviewCard key={index} post={post} />
        ))
      )}
    </Grid>
  );
};

export default Home;
