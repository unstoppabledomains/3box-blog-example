import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "3box";

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

  //   const initData = async () => {
  //   };

  //   const fetchPosts = async (metaData: {
  //     numPosts: number;
  //     posts: Array<string>;
  //   }) => {  };

  //   React.useEffect(() => {
  //     // Posts from 3Box
  //     void initData();
  //   }, []);

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
