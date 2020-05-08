import React from "react";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost, RoutingProps } from "types/app";
import appContext from "services/appContext";
import useStyles from "styles/pages/Drafts.styles";
import useAsyncEffect from "use-async-effect";
import Typography from "@material-ui/core/Typography";
import { getBookmarks } from "services/userActions";

const Bookmarks: React.FunctionComponent<RoutingProps> = ({ handleRoute }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookmarks, setBookmarks] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);
  const { loggedIn } = state.user;

  React.useEffect(() => {
    if (!loggedIn) {
      handleRoute("");
    }
  }, [loggedIn, handleRoute]);

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
            handleRoute={handleRoute}
          />
        ))}
    </div>
  );
};

export default Bookmarks;
