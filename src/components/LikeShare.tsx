import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "styles/components/LikeShare.styles";
import appContext from "services/appContext";
import useAsyncEffect from "use-async-effect";
import Button from "@material-ui/core/Button";
import { getLikes, checkLiked } from "services/blogActions";
import Typography from "@material-ui/core/Typography";
import SocialLogo from "./SocialLogo";

interface Props {
  postId: string;
}

const LikeShare: React.FunctionComponent<Props> = ({ postId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [likes, setLikes] = React.useState<number>(0);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const { state, dispatch } = React.useContext(appContext);
  const {
    user: { loggedIn },
  } = state;

  useAsyncEffect(async () => {
    setLikes(await getLikes({ state, dispatch })(postId));
    if (loggedIn) {
      const checkIsLiked = await checkLiked({ state, dispatch })(postId);
      setIsLiked(checkIsLiked);
    }
  }, [loggedIn]);

  const handleLike = async () => {
    if (isLiked) {
    }
  };

  const handleSocial = (e: any) => {
    const logo = e.target.id;
    console.log(logo);
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftButtons}>
        {/* TIP Button -> Separate component */}
        <Button
          // startIcon={}
          disabled={!loggedIn}
          onClick={handleLike}
          variant={isLiked ? "contained" : "outlined"}
          color="secondary"
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
          onClick={handleSocial}
          id="facebook"
          className={classes.icon}
        >
          <SocialLogo
            logo="facebook"
            iconColor={state.theme.palette.secondary.main}
          />
          <Typography className={classes.iconText}>Facebook</Typography>
        </Button>
        <Button
          variant="text"
          onClick={handleSocial}
          id="twitter"
          className={classes.icon}
        >
          <SocialLogo
            logo="twitter"
            iconColor={state.theme.palette.secondary.main}
          />
          <Typography className={classes.iconText}>Twitter</Typography>
        </Button>
        <Button
          variant="text"
          onClick={handleSocial}
          id="instagram"
          className={classes.icon}
        >
          <SocialLogo
            logo="instagram"
            iconColor={state.theme.palette.secondary.main}
          />
          <Typography className={classes.iconText}>LinkedIn</Typography>
        </Button>
      </div>
    </div>
  );
};

export default LikeShare;
