import React from "react";
import { BlogPost } from "types/app";
import Markdown from "react-showdown";
import { showdownOptions } from "config/showdown";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost } from "services/blogActions";
import Comments from "3box-comments-react";
import { login } from "services/userActions";
import appContext from "services/appContext";
import useStyles from "styles/pages/Read.styles";
import useAsyncEffect from "use-async-effect";
import Paper from "@material-ui/core/Paper";
import BookmarkShare from "components/BookmarkShare";
import timeConverter from "utils/timeConverter";
import Divider from "@material-ui/core/Divider";
import LikeShare from "components/LikeShare";
import PostPagination from "components/PostPagination";

const ReadPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { postId } = useParams();
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);
  const { state, dispatch } = React.useContext(appContext);
  const {
    box,
    user: { walletAddress },
    spaceName,
    adminWallet,
  } = state;

  useAsyncEffect(async () => {
    window.scroll({ top: 0, behavior: "smooth" });
    const _post = await getPost({ state, dispatch })(postId as string);
    setPost(_post);
    setLoading(false);
  }, [postId]);

  const handleLogin = async () => {
    await login({ state, dispatch })();
  };

  return (
    <>
      <Paper className={classes.root}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={classes.headerRow}>
              <Typography className={classes.title} variant="h2" gutterBottom>
                {post.title}
              </Typography>
              <BookmarkShare postId={postId as string} />
            </div>
            <div className={classes.dateAuthorRow}>
              <Typography className={classes.caption} variant="caption">
                {timeConverter(post.threadData?.timestamp as number)} • By{" "}
                {post.threadData?.author}
              </Typography>
            </div>
            <Typography className={classes.description} variant="subtitle1">
              {post.description}
            </Typography>
            <div className={classes.bodyContainer}>
              <Markdown
                dangerouslySetInnerHTML
                markdown={post.body}
                options={showdownOptions}
              />
            </div>
            <Divider className={classes.divider} />
            <LikeShare postId={postId as string} />
            <div className={classes.commentContainer}>
              <div className={classes.comments}>
                <Comments
                  spaceName={spaceName}
                  threadName={`comments-${postId}`}
                  adminEthAddr={adminWallet}
                  box={walletAddress ? box : null}
                  currentUserAddr={walletAddress}
                  loginFunction={handleLogin}
                />
              </div>
            </div>
          </>
        )}
      </Paper>
      <PostPagination postId={postId as string} />
    </>
  );
};

export default ReadPost;
