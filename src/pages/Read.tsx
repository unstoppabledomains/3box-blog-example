import React from "react";
import { BlogPost, ThreadObject } from "types/blog";
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
import useStyles from "styles/Read.styles";

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

  const initData = async () => {
    const _post = await getPost({ state, dispatch })(postId as string);
    setPost(_post);
    setLoading(false);
  };

  React.useEffect(() => {
    void initData();
  }, []);

  const handleLogin = async () => {
    console.log("handleLogin");
    const res = await login({ state, dispatch })();
    console.log("res", res);
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
              adminEthAddr={process.env.REACT_APP_ADMIN_WALLET as string}
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
