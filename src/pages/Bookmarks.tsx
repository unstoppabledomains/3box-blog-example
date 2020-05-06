import React from "react";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost } from "types/app";
import appContext from "services/appContext";
import useStyles from "styles/pages/Drafts.styles";
import useAsyncEffect from "use-async-effect";
import Typography from "@material-ui/core/Typography";
import { getBookmarks } from "services/userActions";

const Bookmarks: React.FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookmarks, setBookmarks] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);

  useAsyncEffect(async () => {
    const initialBookmarks = await getBookmarks({ state, dispatch })();
    setBookmarks(initialBookmarks);
    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Bookmarks
      </Typography>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        bookmarks.map((bookmark: BlogPost, index: number) => (
          <PostPreview key={index} post={bookmark} />
        ))
      )}
    </div>
  );
};

export default Bookmarks;
