import React from "react";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/blog";
import Editor from "components/Editor";
import { addPost } from "services/blogActions";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 1200,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    title: {
      fontSize: 36,
    },
    buttonRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
    },
    textField: {
      marginBottom: theme.spacing(2),
    },
    button: {
      height: 56,
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },
    destroyBtn: {
      backgroundColor: "#d60000",
      "&:hover": {
        backgroundColor: "#9b0000",
      },
      marginRight: theme.spacing(8),
    },
    saveBtn: {
      backgroundColor: "#28a745",
      "&:hover": {
        backgroundColor: "#007717",
      },
    },
  })
);

const WritePost: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<BlogPost>({
    tags: [""],
  } as BlogPost);

  const handleBodyChange = (body: string) => setPost({ ...post, body });
  //   const setPostAttributes = (body: string) => setPost({ ...post, body });
  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [id]: value });
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const postId = await addPost(post);
      setPost({ ...post, threadData: { postId } as ThreadObject });
      history.push(`/posts/${postId}`);
    } catch (error) {
      // TODO handle error
      console.error(error);
    }
  };

  const onDestroy = () => {
    setPost({} as BlogPost);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title} gutterBottom>
        Draft
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            variant="outlined"
            id="title"
            value={post.title}
            onChange={handleChange}
            label="Title"
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            id="description"
            value={post.description}
            onChange={handleChange}
            label="Description"
            multiline
            rows={2}
            rowsMax={3}
            className={classes.textField}
          />
          <Editor value={post.body} onChange={handleBodyChange} />
          <div className={classes.buttonRow}>
            <Button
              className={`${classes.button} ${classes.destroyBtn}`}
              fullWidth
              type="button"
              disabled={loading}
              onClick={onDestroy}
              variant="contained"
            >
              Destroy
            </Button>
            <Button
              className={`${classes.button} ${classes.saveBtn}`}
              fullWidth
              type="submit"
              disabled={loading}
              onClick={onSave}
              variant="contained"
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WritePost;
