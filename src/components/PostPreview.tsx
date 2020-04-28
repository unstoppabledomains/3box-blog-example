import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/blog";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    date: {},
    title: {},
    description: {},
    readButton: {
      maxWidth: 200,
      borderRadius: 25,
    },
  })
);

interface Props {
  post: BlogPost;
}

const PostPreview: React.FunctionComponent<Props> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const { title, description, threadData } = post;
  const { timestamp, postId } = threadData as ThreadObject;

  const handleClick = () => {
    history.push(`/posts/${postId}`);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.date} variant="caption">
        {timestamp}
      </Typography>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <Typography className={classes.description} variant="subtitle2">
        {description}
      </Typography>
      <Button
        onClick={handleClick}
        className={classes.readButton}
        variant="outlined"
      >
        Read More
      </Button>
    </div>
  );
};

export default PostPreview;
