import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllPosts } from "services/Posts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      maxWidth: "100%"
    },
    center: {
      height: "50vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

const Home: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<any[]>([]);

  const initData = async () => {
    const _posts = await getAllPosts();
    console.log("_posts:", _posts);
    setPosts(_posts);
    setLoading(false);
  };

  //   const fetchPosts = async (metaData: {
  //     numPosts: number;
  //     posts: Array<string>;
  //   }) => {
  // TODO May need for fetching images
  //   };

  React.useEffect(() => {
    void initData();
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        posts.map(post => <PostPreview key={post.id} post={post} />)
      )}
    </Grid>
  );
};

export default Home;