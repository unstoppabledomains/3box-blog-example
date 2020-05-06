import React from "react";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/app";
import Editor from "components/Editor";
import {
  addPost,
  addDraft,
  getDrafts,
  removeDraft,
} from "services/blogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import appContext from "services/appContext";
import { login } from "services/userActions";
import useStyles from "styles/pages/Write.styles";
import useAsyncEffect from "use-async-effect";
import Paper from "@material-ui/core/Paper";
import CustomIcon from "components/CustomIcon";
import qs from "query-string";

const WritePost: React.FunctionComponent = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(appContext);
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [draftId, setDraftId] = React.useState<number>(-1);
  const [post, setPost] = React.useState<BlogPost>({
    tags: [""],
  } as BlogPost);
  const { secondary, error } = state.theme.palette;

  useAsyncEffect(async () => {
    //   TODO check for draftId query param
    const query = qs.parse(window.location.search);
    console.log(query);

    if (!state.user.loggedIn) {
      await handleLogin();
    } else if (
      state.user.walletAddress?.toLowerCase() !==
      state.adminWallet.toLowerCase()
    ) {
      history.push("/");
    } else if (query.draftId) {
      const index = parseInt(query.draftId as string, 10);
      const drafts = await getDrafts({ state, dispatch })();
      setDraftId(index);
      setPost(drafts[index]);
    }
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    const user = await login({ state, dispatch })();
    if (
      !user ||
      !user.loggedIn ||
      user.walletAddress?.toLowerCase() !== state.adminWallet.toLowerCase()
    ) {
      history.push("/");
    }
  };

  const handleBodyChange = (body: string) => setPost({ ...post, body });
  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [id]: value });
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const postId = await addPost({ state, dispatch })(post);
      setPost({ ...post, threadData: { postId } as ThreadObject });
      history.push(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDraft = async () => {
    setLoading(true);
    try {
      await addDraft({ state, dispatch })(post);
      history.push(`/drafts`);
    } catch (error) {
      console.error(error);
    }
  };

  const onDestroy = async () => {
    if (draftId > -1) {
      setLoading(true);
      try {
        await removeDraft({ state, dispatch })(draftId.toString());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    setPost({} as BlogPost);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Add Post
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography className={classes.label}>Title</Typography>
          <TextField
            variant="outlined"
            id="title"
            value={post.title}
            onChange={handleChange}
            className={classes.textField}
            // TODO: Max length
          />
          <Typography className={classes.label}>Description</Typography>
          <TextField
            variant="outlined"
            id="description"
            value={post.description}
            onChange={handleChange}
            multiline
            rows={4}
            className={classes.textField}
            // TODO: Max length
          />
          <Typography className={classes.label}>Post</Typography>
          <Editor value={post.body} onChange={handleBodyChange} />
          <div className={classes.buttonRow}>
            <div className={classes.draftPublishGroup}>
              <Button
                className={classes.publishButton}
                disabled={loading}
                onClick={handlePublish}
                variant="contained"
                color="secondary"
                startIcon={
                  <CustomIcon
                    type="check-mark"
                    color={secondary.contrastText}
                  />
                }
              >
                Publish
              </Button>
              <Button
                className={classes.saveButton}
                disabled={loading}
                onClick={handleDraft}
                variant="outlined"
                color="secondary"
                style={{ marginLeft: 8 }}
                startIcon={
                  <CustomIcon type="cloud-upload" color={secondary.main} />
                }
              >
                Save for Later
              </Button>
            </div>
            <Button
              className={classes.destroyButton}
              disabled={loading}
              onClick={onDestroy}
              variant="text"
              startIcon={<CustomIcon type="trash-empty" color={error.main} />}
            >
              Destroy
            </Button>
          </div>
        </>
      )}
    </Paper>
  );
};

export default WritePost;
