import React from "react";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost, RoutingProps } from "types/app";
import { getPosts } from "services/blogActions";
import appContext from "services/appContext";
import useStyles from "styles/pages/Home.styles";
import useAsyncEffect from "use-async-effect";

const Home: React.FunctionComponent<RoutingProps> = ({ handleRoute }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);

  useAsyncEffect(async () => {
    if (!state.posts) {
      setLoading(true);
      const _posts = await getPosts({ state, dispatch })();
      setPosts(_posts);
      setLoading(false);
    } else {
      setPosts(state.posts);
      setLoading(false);
    }
  }, [state.posts]);

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        posts.map((post: BlogPost, index: number) => (
          <PostPreview handleRoute={handleRoute} key={index} post={post} />
        ))
      )}
    </div>
  );
};

export default Home;
