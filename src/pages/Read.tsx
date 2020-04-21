import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BlogPost } from "types/blog";
import Markdown from "react-showdown";
import { showdownOptions } from "config/showdown";
import { useHistory, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPost } from "services/blogActions";

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
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);

  const initData = async () => {
    const _post = await getPost(postId as string);
    setPost(_post);
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    void initData();
  }, []);

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
        </>
      )}
    </div>
  );
};

export default ReadPost;
