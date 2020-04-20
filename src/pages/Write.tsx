import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NewBlogPost, emptyPost } from "types/blog";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

// TODO
/**
 * [] Check Auth (context)
 * [] PUT: AddPost()
 * [] MDX Write Post
 */

const WritePost: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = React.useState<NewBlogPost>(emptyPost);

  //   const initData = async () => {};

  const handleChange = (e: any) => {
    const { value, id } = e.target;
    setPost({ ...post, [id]: value });
  };

  //   React.useEffect(() => {
  // void initData();
  //   }, []);

  const submitPost = async () => {};

  return <div className={classes.root}></div>;
};

export default WritePost;
