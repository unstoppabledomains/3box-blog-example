import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BlogPost, ThreadObject } from "types/blog";
import Markdown from "react-showdown";
import { showdownOptions } from "config/showdown";
import { useHistory, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost } from "services/blogActions";
import Comments from "3box-comments-react";
import getBlog from "services/Blog";
import { login } from "services/userActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 800,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(2),
    },
    title: {},
    author: {},
    description: {},
    bodyContainer: {
      display: "flex",
      marginBottom: theme.spacing(4),
    },
    commentContainer: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 616,
      overflowX: "hidden",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    loadingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
    },
  })
);

// TODO
/**
 * [] Auth w/ 3Box Profiles
 */

const ReadPost: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const history = useHistory();
  const { postId } = useParams();
  const [box, setBox] = React.useState();
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);
  const [userAddress, setUserAddress] = React.useState<string>("");
  const [spaceName, setSpaceName] = React.useState<string>("");

  const initData = async () => {
    const _blog = await getBlog();
    setSpaceName(_blog.spaceName);
    setBox(_blog.box);
    setUserAddress(_blog.userWallet);
    const _post = await getPost(postId as string);
    setPost(_post);
    setLoading(false);
  };

  React.useEffect(() => {
    void initData();
  }, []);

  const handleLogin = async () => {
    const _userAddress = await login();
    const _blog = await getBlog();
    setBox(_blog.box);
    setUserAddress(_userAddress);
    return _blog.box;
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
              // required
              spaceName={spaceName}
              threadName={`comments-${postId}`}
              adminEthAddr={process.env.REACT_APP_ADMIN_WALLET as string}
              // Required props for context A) & B)
              // FIXME: issues with null instance right after login; Can't update with auth box or authenticate box issues
              box={userAddress ? box : null}
              currentUserAddr={userAddress}
              // Required prop for context B)
              loginFunction={handleLogin}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReadPost;
