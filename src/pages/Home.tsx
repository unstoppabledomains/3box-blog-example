import React from "react";
import Grid from "@material-ui/core/Grid";
import PreviewCard from "components/PreviewCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost } from "types/blog";
import { getPosts } from "services/blogActions";
import appContext from "services/appContext";
import useStyles from "styles/Home.styles";

const Home: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);

  const initData = async () => {
    const _posts = await getPosts({ state, dispatch })();
    setPosts(_posts);
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
