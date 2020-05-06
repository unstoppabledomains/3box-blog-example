import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { defaultTheme } from "utils/createTheme";
import { Dispatch } from "react";
import { AppAction } from "./actions";

// Interfaces
export interface ConfigFile {
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
  domain: string;
  title: string;
  threadAddress: string;
  adminWallet: string;
  spaceName: string;
  socials: SocialMedia;
}

export interface AppContext {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}
export interface AppState {
  box: any;
  space: any;
  thread: any;
  user: User;
  posts?: BlogPost[];
  theme: Theme;
  domain: string;
  title: string;
  threadAddress: string;
  adminWallet: string;
  spaceName: string;
  socials: SocialMedia;
}

export interface SocialMedia extends Partial<{ [S in Socials]: string }> {
  iconColor: string;
}

export type Socials =
  | "facebook"
  | "instagram"
  | "linkedIn"
  | "medium"
  | "telegram"
  | "twitter";

export interface User {
  loggedIn: boolean;
  walletAddress?: string;
  profileImg?: string;
  bookmarksSpace?: any;
}

export interface BlogPost {
  title: string;
  description: string;
  tags: string[];
  body: string;
  threadData?: ThreadObject;
}

export interface DraftPost {
  id: string;
  post: string;
}

export interface ThreadObject {
  author: string;
  message: string;
  postId: string;
  timestamp: number;
}

// default values
export const initialState = {
  box: null,
  space: null,
  thread: null,
  user: {
    loggedIn: false,
  },
  posts: undefined,
  theme: defaultTheme,
  domain: "",
  title: "",
  threadAddress: "",
  adminWallet: "",
  spaceName: "",
  socials: {
    iconColor: "#fff",
  },
};

export const FAILED_TO_LOAD: BlogPost = {
  title: "Failed to load",
  description: "Failed to load",
  tags: ["Failed to load"],
  body: "Failed to load",
};
