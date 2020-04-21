import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import { BlogPost, ThreadObject } from "types/blog";
import Editor from "components/Editor";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addPost, getPosts } from "services/blogActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

// TODO
/**
 * [] Check Auth (context)
 */

const WritePost: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<BlogPost>({
    title: "TITLE",
    description: "lorem ipsum stuff",
    tags: ["test", "new", "don"],
  } as BlogPost);

  const setPostBody = (body: string) => setPost({ ...post, body });
  //   const setPostAttributes = (body: string) => setPost({ ...post, body });

  const onSave = async () => {
    setLoading(true);
    try {
      const postId = await addPost(post);
      setPost({ ...post, threadData: { postId } as ThreadObject });
      setLoading(false);
      //   history.push(`/posts/${id}`);
    } catch (error) {
      // TODO handle error
    }
  };
  //   React.useEffect(() => {}, []);

  const onDestroy = () => {
    console.log("Destroy");
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Editor value={post.body} onChange={setPostBody} />
          <div>
            <nav>
              <Button type="submit" disabled={loading} onClick={onSave}>
                Save
              </Button>
            </nav>
            <nav>
              <Button type="button" disabled={loading} onClick={onDestroy}>
                Destroy
              </Button>
            </nav>
          </div>
          <div>
            {post.threadData && post.threadData.postId && (
              <>
                ➡
                <Link to={`/post/${post.threadData.postId}`}>link to post</Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WritePost;
