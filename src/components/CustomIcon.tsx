import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

interface Props extends SvgIconProps {
  type:
    | "facebook"
    | "instagram"
    | "linkedIn"
    | "medium"
    | "telegram"
    | "twitter"
    | "bookmarks"
    | "bookmarks-add"
    | "cloud-upload"
    | "pencil-create"
    | "thumbs-up"
    | "trash-empty"
    | "edit"
    | "arrow-right";
}

const CustomIcon: React.FunctionComponent<Props> = ({ type, ...props }) => {
  return <SvgIcon {...props}>{/* {type === } */}</SvgIcon>;
};

export default CustomIcon;
