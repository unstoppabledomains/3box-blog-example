import React from "react";
import { BlogPost, RoutingProps } from "types/app";
import Markdown from "react-showdown";
import { showdownOptions } from "config/showdown";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost, deletePost } from "services/blogActions";
// import Comments from "3box-comments-react";
import appContext from "services/appContext";
import useStyles from "styles/pages/Read.styles";
import useAsyncEffect from "use-async-effect";
import Paper from "@material-ui/core/Paper";
import BookmarkShare from "components/BookmarkShare";
import timeConverter from "utils/timeConverter";
import Divider from "@material-ui/core/Divider";
import LikeShare from "components/LikeShare";
import PostPagination from "components/PostPagination";

interface Props {
  id: string;
}

const ReadPost: React.FunctionComponent<Props & RoutingProps> = ({
  id,
  handleRoute,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);
  const [postId, setPostId] = React.useState<string>("");
  //   const [commentsThread, setCommentsThread] = React.useState<string>();
  const { state, dispatch } = React.useContext(appContext);

  const {
    // box,
    user: {
      // walletAddress,
      isAdmin,
    },
    // spaceName,
  } = state;

  useAsyncEffect(async () => {
    if (id && id !== postId) {
      //   setCommentsThread(`comments-${id}`);
      setPostId(id);
      try {
        const newPost = await getPost({ state, dispatch })(id as string);
        setPost(newPost);
        setLoading(false);
      } catch (error) {
        handleRoute("");
      }
    } else if (!id) {
      handleRoute("");
    }
  }, [id]);

  const handleDelete = () => {
    if (
      window.confirm(
        "Do you really want to delete this post? This action is irreversible"
      )
    ) {
      setLoading(true);
      deletePost({ state, dispatch })(id as string).then((res) => {
        window.alert("Post successfully removed");
        handleRoute("");
      });
    }
  };

  //   const handleLogin = async () => {
  //     await login({ state, dispatch })();
  //   };

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
              <BookmarkShare
                postId={postId}
                handleDelete={isAdmin ? handleDelete : undefined}
              />
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
            <LikeShare postId={postId} />
            {/* <div className={classes.commentContainer}>
              <div className={classes.comments}>
                {commentsThread && box && (
                  <Comments
                    spaceName={spaceName}
                    threadName={commentsThread}
                    adminEthAddr={adminWallet} // moderators[0]
                    box={box}
                    currentUserAddr={walletAddress}
                    loginFunction={handleLogin}
                  />
                )}
              </div>
            </div> */}
          </>
        )}
      </Paper>
      <PostPagination
        postId={postId}
        handleRoute={handleRoute}
        setLoading={setLoading}
      />
    </>
  );
};

export default ReadPost;
