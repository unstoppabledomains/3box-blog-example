import React from "react";
import { BlogPost, ThreadObject } from "types/app";
import Markdown from "react-showdown";
import { showdownOptions } from "config/showdown";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost } from "services/blogActions";
import Comments from "3box-comments-react";
import config from "config/blogConfig.json";
import { login } from "services/userActions";
import appContext from "services/appContext";
import useStyles from "styles/pages/Read.styles";
import useAsyncEffect from "use-async-effect";

const ReadPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { postId } = useParams();
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);
  const { state, dispatch } = React.useContext(appContext);
  const {
    box,
    user: { walletAddress },
  } = state;
  const { spaceName } = config;

  useAsyncEffect(async () => {
    const _post = await getPost({ state, dispatch })(postId as string);
    setPost(_post);
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    await login({ state, dispatch })();
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.titleContainer}>
            <Typography className={classes.title} variant="h2" gutterBottom>
              {post.title}
            </Typography>
            <Typography
              className={classes.author}
              variant="subtitle2"
              gutterBottom
            >
              By {(post.threadData as ThreadObject).author}
            </Typography>
            <Typography className={classes.description} variant="subtitle1">
              {post.description}
            </Typography>
          </div>
          <div className={classes.bodyContainer}>
            <Markdown
              dangerouslySetInnerHTML
              markdown={post.body}
              options={showdownOptions}
            />
          </div>
          <div className={classes.commentContainer}>
            <Comments
              spaceName={spaceName}
              threadName={`comments-${postId}`}
              adminEthAddr={config.adminWallet}
              box={walletAddress ? box : null}
              currentUserAddr={walletAddress}
              loginFunction={handleLogin}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReadPost;
