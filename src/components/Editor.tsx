import React from "react";
import MarkDownEditor from "react-mde";
import Showdown from "showdown";
import useStyles from "styles/components/Editor.styles";
import "react-mde/lib/styles/css/react-mde-all.css";
import { showdownOptions } from "config/showdown";

const converter = new Showdown.Converter(showdownOptions);

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FunctionComponent<Props> = ({ value, onChange }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState<
    "write" | "preview" | undefined
  >("write");

  return (
    <div className={classes.root}>
      {/* Source: https://github.com/andrerpena/react-mde */}
      <MarkDownEditor
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown: any) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
};

export default Editor;
