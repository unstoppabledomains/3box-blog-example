import React from "react";
import useStyles from "styles/components/BookmarkShare.styles";
import {
  addBookmark,
  removeBookmark,
  checkBookmarked,
} from "services/userActions";
import appContext from "services/appContext";
import useAsyncEffect from "use-async-effect";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import BookmarkAdd from "components/BookmarkAdd";
import Bookmarked from "@material-ui/icons/Bookmark";
import SharePopup from "./SharePopup";

interface Props {
  postId: string;
}

const BookmarkShare: React.FunctionComponent<Props> = ({ postId }) => {
  const classes = useStyles();
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { state, dispatch } = React.useContext(appContext);
  const {
    user: { loggedIn },
  } = state;

  useAsyncEffect(async () => {
    setIsBookmarked(await checkBookmarked({ state, dispatch })(postId));
  }, []);

  const handleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark({ state, dispatch })(postId);
      setIsBookmarked(false);
    } else {
      await addBookmark({ state, dispatch })(postId);
      setIsBookmarked(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      {loggedIn && (
        <IconButton onClick={handleBookmark} className={classes.icon}>
          {isBookmarked ? (
            <Bookmarked color="secondary" />
          ) : (
            <BookmarkAdd color={state.theme.palette.secondary.main} />
          )}
        </IconButton>
      )}
      <IconButton
        className={classes.icon}
        ref={anchorRef}
        onClick={handleOpen}
        aria-controls="social-popup"
        aria-haspopup="true"
      >
        <ShareIcon color="secondary" />
      </IconButton>
      <SharePopup handleClose={handleClose} anchorRef={anchorRef} open={open} />
    </div>
  );
};

export default BookmarkShare;
