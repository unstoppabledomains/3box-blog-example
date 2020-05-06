import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/app";
import Button from "@material-ui/core/Button";
import timeConverter from "utils/timeConverter";
import useStyles from "styles/components/PostPreview.styles";
import Paper from "@material-ui/core/Paper";
import BookmarkShare from "components/BookmarkShare";
import CustomIcon from "components/CustomIcon";
import appContext from "services/appContext";

interface Props {
  post: BlogPost;
  draft?: boolean;
  handleRemoveDraft?: (draftId: string) => void;
}

const PostPreview: React.FunctionComponent<Props> = ({
  post,
  draft = false,
  handleRemoveDraft,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { title, description, threadData } = post;
  const { timestamp, postId } = threadData as ThreadObject;
  const date = timeConverter(timestamp);
  const { state } = React.useContext(appContext);
  const {
    theme: { palette },
  } = state;

  const handleRead = () => {
    history.push(`/posts/${postId}`);
  };

  const handleEdit = () => {
    // TODO handle in Write
    history.push(`/new?draft=${postId}`);
  };

  const onRemoveDraft = () => {
    if (handleRemoveDraft) {
      handleRemoveDraft(post.threadData?.postId as string);
    }
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
      <div className={classes.buttonRow}>
        {draft ? (
          <>
            <Button
              onClick={handleEdit}
              className={classes.containedButton}
              variant="contained"
              color="secondary"
              startIcon={
                <CustomIcon
                  color={palette.secondary.contrastText}
                  type="edit"
                />
              }
            >
              EDIT
            </Button>
            <Button
              onClick={onRemoveDraft}
              className={classes.destroyButton}
              variant="text"
              startIcon={
                <CustomIcon color={palette.error.main} type="trash-empty" />
              }
            >
              DESTROY
            </Button>
          </>
        ) : (
          <Button
            onClick={handleRead}
            className={classes.containedButton}
            variant="contained"
            color="secondary"
            endIcon={
              <CustomIcon
                color={palette.secondary.contrastText}
                type="arrow-right"
              />
            }
          >
            Read More
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default PostPreview;
