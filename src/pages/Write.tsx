import React from "react";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/app";
import Editor from "components/Editor";
import { addPost } from "services/blogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import appContext from "services/appContext";
import config from "config/blogConfig.json";
import { login } from "services/userActions";
import useStyles from "styles/pages/Write.styles";
import useAsyncEffect from "use-async-effect";

const WritePost: React.FunctionComponent = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(appContext);
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [post, setPost] = React.useState<BlogPost>({
    tags: [""],
  } as BlogPost);

  useAsyncEffect(async () => {
    if (!state.user.loggedIn) {
      await handleLogin();
    } else if (
      state.user.walletAddress?.toLowerCase() !==
      config.adminWallet.toLowerCase()
    ) {
      void history.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    const user = await login({ state, dispatch })();
    if (
      !user ||
      !user.loggedIn ||
      user.walletAddress.toLowerCase() !== config.adminWallet.toLowerCase()
    ) {
      history.push("/");
    }
    setLoading(false);
  };

  const handleBodyChange = (body: string) => setPost({ ...post, body });
  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [id]: value });
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const postId = await addPost({ state, dispatch })(post);
      setPost({ ...post, threadData: { postId } as ThreadObject });
      history.push(`/posts/${postId}`);
    } catch (error) {
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
