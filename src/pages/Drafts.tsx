import React from "react";
import PostPreview from "components/PostPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BlogPost, RoutingProps } from "types/app";
import { getDrafts, removeDraft } from "services/blogActions";
import appContext from "services/appContext";
import useStyles from "styles/pages/Drafts.styles";
import useAsyncEffect from "use-async-effect";
import Typography from "@material-ui/core/Typography";

const Drafts: React.FunctionComponent<RoutingProps> = ({ handleRoute }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [drafts, setDrafts] = React.useState<BlogPost[]>([]);
  const { state, dispatch } = React.useContext(appContext);
  const { loggedIn } = state.user;

  React.useEffect(() => {
    if (!loggedIn) {
      handleRoute("");
    }
  }, [loggedIn, handleRoute]);

  useAsyncEffect(async () => {
    if (loggedIn) {
      const newDrafts = await getDrafts({ state, dispatch })();
      setDrafts(newDrafts);
      setLoading(false);
    }
  }, []);

  const handleRemoveDraft = async (draftId: string) => {
    await removeDraft({ state, dispatch })(draftId);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Drafts
      </Typography>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : (
        drafts.map((draft: BlogPost, index: number) => (
          <PostPreview
            key={index}
            post={draft}
            draft={true}
            handleRemove={handleRemoveDraft}
            handleRoute={handleRoute}
          />
        ))
      )}
    </div>
  );
};

export default Drafts;
