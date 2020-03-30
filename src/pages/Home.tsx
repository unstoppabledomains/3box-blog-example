import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostPreview from "../components/PostPreview";
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

  const initData = async () => {
    const providerBox = await Box.create((window as any).ethereum);
    const address = "0x47b0fde4622577cb10ed2c79108d79cbb582ee5c";
    const spaces = ["testBlog"];
    console.log("start auth");
    await providerBox.auth(spaces, { address });
    await providerBox.syncDone;
    const space = await providerBox.openSpace("testBlog");
    await space.syncDone;
    console.log("finish space sync");
    const spaceMetaData = await space.public.get("blog-meta");
    console.log(spaceMetaData);
    // const newPosts =
    await fetchPosts(spaceMetaData);
    // setPosts(featuredPosts);
    setLoading(false);
  };

  const fetchPosts = async (metaData: {
    numPosts: number;
    posts: Array<string>;
  }) => {
    console.log("in fetchPosts");

    const newPosts = [];
    for (let index = 0; index < metaData.posts.length; index++) {
      console.log("in loop");
      const ipfsHash = metaData.posts[index];
      console.log(ipfsHash);
      const newData = await fetch(
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}/meta-data.json`
      ).then(res => res.json());
      newData["id"] = ipfsHash;
      console.log(newData);
      newPosts.push(newData);
    }
    console.log(newPosts);
  };

  React.useEffect(() => {
    // Posts from 3Box
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
