import React from "react";
import { useHistory } from "react-router-dom";
import { ThreadObject } from "types/app";
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

interface Props {
  postId: string;
}

const BookmarkShare: React.FunctionComponent<Props> = ({ postId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
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
      <IconButton className={classes.icon}>
        <ShareIcon color="secondary" />
      </IconButton>
    </div>
  );
};

export default BookmarkShare;
