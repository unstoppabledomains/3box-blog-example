import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/app";
import Button from "@material-ui/core/Button";
import timeConverter from "utils/timeConverter";
import useStyles from "styles/components/PostPreview.styles";
import Paper from "@material-ui/core/Paper";
import ArrowForward from "@material-ui/icons/ArrowForward";
import BookmarkShare from "components/BookmarkShare";

interface Props {
  post: BlogPost;
}

const PostPreview: React.FunctionComponent<Props> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const { title, description, threadData } = post;
  const { timestamp, postId } = threadData as ThreadObject;
  const date = timeConverter(timestamp);

  const handleClick = () => {
    history.push(`/posts/${postId}`);
  };
  //   TODO author to human readable or wallet

  return (
    <Paper className={classes.container}>
      <div className={classes.topRow}>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <BookmarkShare postId={post.threadData?.postId as string} />
      </div>
      <div className={classes.dateAuthorRow}>
        <Typography className={classes.caption} variant="caption">
          {date} • By {threadData?.author}
        </Typography>
      </div>
      <Typography className={classes.description} variant="subtitle1">
        {description}
      </Typography>
      <Button
        onClick={handleClick}
        className={classes.readButton}
        variant="contained"
        color="secondary"
        endIcon={<ArrowForward />}
      >
        Read More
      </Button>
    </Paper>
  );
};

export default PostPreview;
