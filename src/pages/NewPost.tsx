import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NewBlogPost, emptyPost } from "types/blog";
import { addNewPost } from "services/Posts";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      maxWidth: "100%"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      maxWidth: 800,
      height: "55vh",
      justifyContent: "space-around",
      marginTop: theme.spacing(3)
    }
  })
);

const NewPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = React.useState<NewBlogPost>(emptyPost);

  //   const initData = async () => {};

  const handleChange = (e: any) => {
    const { value, id } = e.target;
    setPost({ ...post, [id]: value });
  };

  React.useEffect(() => {
    // void initData();
    setPost({
      ...post,
      tags: ["test", "example"],
      assetsHash: "https://source.unsplash.com/random"
    });
  }, []);

  const submitPost = async () => {
    if (post) {
      // TODO validation
      console.log("Submitting New Post", post.toString());
      const cid = await addNewPost(post);
      console.log("cid", cid);
      history.push("/");
    }
    // const res = await orbitDb.node.dag.get(cid);
    // console.log("res:", res.value.payload);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          onChange={handleChange}
          value={post.title}
          id="title"
          label="Title"
        />
        <TextField
          onChange={handleChange}
          value={post.description}
          id="description"
          label="Preview Description"
        />
        <TextField
          onChange={handleChange}
          value={post.content}
          id="content"
          label="Content"
        />
        <Button onClick={submitPost}>Submit New Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
