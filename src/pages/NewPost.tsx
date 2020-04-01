import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { examplePost, NewBlogPost } from "types/blog";
import { addNewPost } from "services/Posts";
import getOrbit from "services/orbit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      maxWidth: "100%"
    }
  })
);

const NewPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const [post, setPost] = React.useState<NewBlogPost>();
  const [orbitDb, setOrbitDb] = React.useState<any>();
  const initData = async () => {
    const orbit = await getOrbit();
    setOrbitDb(orbit);
  };

  React.useEffect(() => {
    void initData();
    // TODO get all posts from 3Box
    setPost(examplePost);
  }, []);

  const submitPost = async () => {
    console.log("Submitting New Post");
    const cid = await addNewPost({ ...examplePost, title: "New Example" });
    const res = await orbitDb.node.dag.get(cid);
    console.log("res:", res.value.payload);
  };

  return (
    <div className={classes.root}>
      <div className={classes.root}>{`${post}`}</div>
      <Button onClick={submitPost}>Submit New Post</Button>
    </div>
  );
};

export default NewPost;
