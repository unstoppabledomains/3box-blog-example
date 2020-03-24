import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "3box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      maxWidth: "100%"
    }
  })
);

const featuredPost = {
  id: 0,
  title: "Featured post",
  date: "Nov 12",
  description:
    "This is a wider card with supporting text below as a natural lead-in to additional content.",
  image: "https://source.unsplash.com/random",
  imageText: "Image Text"
};

const NewPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const [post, setPost] = React.useState<any>([]);
  const initData = async () => {
    // const profile = await Box.getProfile(
    //   "0x398C30B7Bb11d131863aCB7c37dF157Ceb96cb3E"
    // );
    // console.log(profile);

    const providerBox = await Box.create((window as any).ethereum);
    // console.log(providerBox);

    // Authenticate Profile
    const address = "0x47b0fde4622577cb10ed2c79108d79cbb582ee5c";
    const spaces = ["testBlog"];
    console.log("start auth");
    await providerBox.auth(spaces, { address });
    // console.log("start sync");
    await providerBox.syncDone;
    // console.log("finish sync");
    // console.log(providerBox.public);

    // Open Space
    // console.log("start open");
    const space = await providerBox.openSpace("testBlog");
    // console.log("start space sync");
    await space.syncDone;
    console.log("finish space sync");
    // console.log(space);

    // const data = {
    //   numPosts: 1,
    //   posts: ["QmYbrnw8WDD7eTqqpRyYXPnhBGdrtqWg3AVQumqiAKLSrg"]
    // };
    // Save Blog Post
    // set
    // await space.public.set("blog-meta", data);
    // get
    const spaceMetaData = await space.public.get("blog-meta");
    console.log(spaceMetaData);
    // const newData = addPost(spaceMetaData);
    // await space.public.set("blog-meta", newData);
    // console.log("Space updated");
    // const updatedSpace = await space.public.get("blog-meta");
    // console.log(updatedSpace);
  };

  const addPost = (metaData: { numPosts: number; posts: Array<string> }) => {
    const numPosts = metaData.posts.push(
      "QmNxmZ2NP7png8wXQa7K3ptHmqxPA4fS6ArqU43MNDHmn1"
    );
    return { numPosts, posts: metaData.posts };
  };

  React.useEffect(() => {
    void initData();
    // TODO get all posts from 3Box
    setPost(featuredPost);
  }, []);

  const submitPost = () => {};

  return (
    <div className={classes.root}>
      <div className={classes.root}>{`${post}`}</div>
      <Button onClick={submitPost}>Submit New Post</Button>
    </div>
  );
};

export default NewPost;
