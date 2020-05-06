import React from "react";
import useStyles from "styles/components/LikeShare.styles";
import appContext from "services/appContext";
import useAsyncEffect from "use-async-effect";
import Button from "@material-ui/core/Button";
import {
  getLikes,
  checkLiked,
  addLike,
  removeLike,
} from "services/blogActions";
import Typography from "@material-ui/core/Typography";
import CustomIcon from "./CustomIcon";
import {
  handleFacebook,
  handleTwitter,
  handleLinkedIn,
} from "utils/socialShare";

interface Props {
  postId: string;
}

const LikeShare: React.FunctionComponent<Props> = ({ postId }) => {
  const classes = useStyles();
  const [likes, setLikes] = React.useState<number>(0);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const { state, dispatch } = React.useContext(appContext);
  const {
    user: { loggedIn },
  } = state;
  const secondaryColor = state.theme.palette.secondary.main;
  const { contrastText } = state.theme.palette.secondary;

  useAsyncEffect(async () => {
    setLikes(await getLikes({ state, dispatch })(postId));
    if (loggedIn) {
      const checkIsLiked = await checkLiked({ state, dispatch })(postId);
      setIsLiked(checkIsLiked);
    }
  }, [loggedIn]);

  const handleLike = async () => {
    if (isLiked) {
      await removeLike({ state, dispatch })(postId);
      setLikes((l) => l + 1);
      setIsLiked(false);
    } else {
      await addLike({ state, dispatch })(postId);
      setLikes((l) => l - 1);
      setIsLiked(true);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftButtons}>
        {/* TIP Button -> Separate component */}
        <Button
          startIcon={
            <CustomIcon
              type="thumbs-up"
              color={isLiked ? contrastText : secondaryColor}
            />
          }
          disabled={!loggedIn}
          onClick={handleLike}
          variant={isLiked ? "contained" : "outlined"}
          color="secondary"
          className={classes.likeButton}
        >
          {likes}
        </Button>
      </div>
      <div className={classes.shareRow}>
        <Typography className={classes.shareText}>
          Share this post on
        </Typography>
        <Button
          variant="text"
          onClick={handleFacebook}
          id="facebook"
          className={classes.icon}
        >
          <CustomIcon type="facebook" color={secondaryColor} />
          <Typography className={classes.iconText}>Facebook</Typography>
        </Button>
        <Button
          variant="text"
          onClick={handleTwitter}
          id="twitter"
          className={classes.icon}
        >
          <CustomIcon type="twitter" color={secondaryColor} />
          <Typography className={classes.iconText}>Twitter</Typography>
        </Button>
        <Button
          variant="text"
          onClick={handleLinkedIn}
          id="instagram"
          className={classes.icon}
        >
          <CustomIcon type="instagram" color={secondaryColor} />
          <Typography className={classes.iconText}>LinkedIn</Typography>
        </Button>
      </div>
    </div>
  );
};

export default LikeShare;
