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
 * [] Auth w/ 3Box Profiles
 * [] Comments w/ 3Box Plugin
 */

const ReadPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = React.useState<NewBlogPost>(emptyPost);

  //   const initData = async () => {};

  //   React.useEffect(() => {
  // void initData();
  //   }, []);

  return <div className={classes.root}></div>;
};

export default ReadPost;
