import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BlogPost } from "types/blog";
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
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h2">{post.title}</Typography>
          <Markdown
            dangerouslySetInnerHTML
            markdown={post.body}
            options={showdownOptions}
          />
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
        </>
      )}
    </div>
  );
};

export default ReadPost;
