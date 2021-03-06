import React from "react";
import appContext from "services/appContext";
import useStyles from "styles/components/PostPagination.styles";
import CustomIcon from "./CustomIcon";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useAsyncEffect from "use-async-effect";
import { getPosts } from "services/blogActions";
import { RoutingProps } from "types/app";

interface Props {
  postId: string;
  setLoading: (loading: boolean) => void;
}

const PostPagination: React.FunctionComponent<Props & RoutingProps> = ({
  postId,
  handleRoute,
  setLoading,
}) => {
  const classes = useStyles();
  const [neighborPosts, setNeighborPosts] = React.useState<{
    next: string;
    previous: string;
  }>({ next: "", previous: "" });
  const { state, dispatch } = React.useContext(appContext);
  const {
    theme: { palette },
  } = state;

  useAsyncEffect(async () => {
    const posts = await getPosts({ state, dispatch })();
    const index = posts.findIndex((post) => post.threadData!.postId === postId);

    if (index > -1) {
      const next = posts[index + 1] ? posts[index + 1]!.threadData!.postId : "";
      const previous = posts[index - 1]
        ? posts[index - 1]!.threadData!.postId
        : "";
      setNeighborPosts({
        next,
        previous,
      });
    }
  }, [postId]);

  const handlePrevious = () => {
    setLoading(true);
    handleRoute("read", neighborPosts.previous);
  };
  const handleNext = () => {
    setLoading(true);
    handleRoute("read", neighborPosts.next);
  };

  return (
    <Paper className={classes.root}>
      <Button
        className={classes.arrowButton}
        color="secondary"
        onClick={handlePrevious}
        disabled={neighborPosts.previous === ""}
      >
        <CustomIcon
          type="arrow-left"
          color={
            neighborPosts.previous === ""
              ? palette.action.disabled
              : palette.secondary.main
          }
        />
        Previous Post
      </Button>
      <Button
        className={classes.arrowButton}
        color="secondary"
        onClick={handleNext}
        disabled={neighborPosts.next === ""}
      >
        Next Post
        <CustomIcon
          type="arrow-right"
          color={
            neighborPosts.next === ""
              ? palette.action.disabled
              : palette.secondary.main
          }
        />
      </Button>
    </Paper>
  );
};

export default PostPagination;
