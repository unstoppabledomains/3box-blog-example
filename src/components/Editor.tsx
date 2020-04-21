import React from "react";
import MarkDownEditor from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { showdownOptions } from "config/showdown";
import { BlogPost } from "types/blog";

const converter = new Showdown.Converter(showdownOptions);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const Editor: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [saving, setSaving] = React.useState<boolean>(false);
  const [post, setPost] = React.useState<BlogPost>({} as BlogPost);
  const [selectedTab, setSelectedTab] = React.useState<
    "write" | "preview" | undefined
  >("write");

  const setPostBody = (body: string) => setPost({ ...post, body });
  const setPostAttributes = (body: string) => setPost({ ...post, body });

  const onSave = () => {
    console.log("Save");
    const attributes = `---
	title: ${post.title}
	description: ${post.description}
	tags: ${post.tags.join(",")}
	---
	`;
    const _post = attributes.concat(post.body);
  };

  const onDestroy = () => {
    console.log("Destroy");
  };

  return (
    <>
      <div>
        {/* Source: https://github.com/andrerpena/react-mde */}
        <MarkDownEditor
          value={post.body}
          onChange={setPostBody}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown: any) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
      <div>
        <nav>
          <Button type="submit" disabled={saving} onClick={onSave}>
            Save
          </Button>
        </nav>
        <nav>
          <Button type="button" disabled={saving} onClick={onDestroy}>
            Destroy
          </Button>
        </nav>
        {saving && <CircularProgress />}
      </div>
      <div>
        {post.threadData && post.threadData.postId && (
          <>
            ➡{" "}
            {/* <Link to={`/${post.attributes.postId}`}>
              {post.title}
            </Link> */}
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
