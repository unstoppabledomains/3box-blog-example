import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllPosts, clearDB } from "services/Posts";
import { getIpfsPeers, sendMessage } from "services/ipfs";

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
    (window as any).LOG = "orbit*";
    const peers = await getIpfsPeers();
    console.log("peers", peers);

    const _posts = await getAllPosts();
    console.log("_posts:", _posts);
    setPosts(_posts);
    setLoading(false);
    sendMessage("QmXG8yk8UJjMT6qtE2zSxzz3U7z5jSYRgVWLCUFqAVnByM", {
      hello: "world"
    });
  };

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
