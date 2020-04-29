import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/app";
import Button from "@material-ui/core/Button";
import timeConverter from "utils/timeConverter";
import useStyles from "styles/components/PostPreview.styles";

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

  return (
    <div className={classes.container}>
      <Typography className={classes.date} variant="caption">
        {date}
      </Typography>
      <Typography className={classes.title} variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography className={classes.description} variant="subtitle1">
        {description}
      </Typography>
      <Button
        onClick={handleClick}
        className={classes.readButton}
        variant="outlined"
        color="primary"
      >
        Read More
      </Button>
    </div>
  );
};

export default PostPreview;
