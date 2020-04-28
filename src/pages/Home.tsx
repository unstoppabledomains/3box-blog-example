import React from "react";
import PostPreview from "components/PostPreview";
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
    <div className={classes.root}>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        posts.map((post: BlogPost, index: number) => (
          <PostPreview key={index} post={post} />
        ))
      )}
    </div>
  );
};

export default Home;
