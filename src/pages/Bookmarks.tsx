import React from "react";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost } from "types/app";
import appContext from "services/appContext";
import useStyles from "styles/pages/Drafts.styles";
import useAsyncEffect from "use-async-effect";
import Typography from "@material-ui/core/Typography";
import { getBookmarks } from "services/userActions";
import { useHistory } from "react-router-dom";

const Bookmarks: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookmarks, setBookmarks] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);
  const { loggedIn } = state.user;

  React.useEffect(() => {
    if (!loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  useAsyncEffect(async () => {
    if (loggedIn) {
      const initialBookmarks = await getBookmarks({ state, dispatch })();
      setBookmarks(initialBookmarks);
      setLoading(false);
    }
  }, []);

  const handleRemove = (postId: string) => {
    const newBookmarks = bookmarks.filter(
      (bookmark) => bookmark.threadData?.postId !== postId
    );
    setBookmarks(newBookmarks);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Bookmarks
      </Typography>
      {loading && (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      )}
      {bookmarks &&
        bookmarks.map((bookmark: BlogPost, index: number) => (
          <PostPreview
            key={index}
            post={bookmark}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default Bookmarks;
