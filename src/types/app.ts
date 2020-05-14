import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { defaultTheme } from "utils/createTheme";
import { Dispatch } from "react";
import { AppAction } from "./actions";

export type AppPages = "read" | "write" | "drafts" | "bookmarks" | "";
export interface RoutingProps {
  handleRoute: (page: any, docId?: string) => void;
}
// Interfaces
export interface ConfigFile {
  title: string;
  logo?: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
  domain: string;
  threadAddress: string;
  adminWallet: string;
  spaceName: string;
  socials: TemplateSocials;
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
  logo?: string;
  threadAddress: string;
  adminWallet: string;
  adminName?: string;
  spaceName: string;
  socials: TemplateSocials;
}

export interface TemplateSocials {
  hasFacebook: boolean;
  hasInstagram: boolean;
  hasLinkedIn: boolean;
  hasMedium: boolean;
  hasTelegram: boolean;
  hasTwitter: boolean;
  facebook: string;
  instagram: string;
  linkedIn: string;
  medium: string;
  telegram: string;
  twitter: string;
  iconColor: string;
}

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
export const initialState: AppState = {
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
    hasFacebook: false,
    hasInstagram: false,
    hasLinkedIn: false,
    hasMedium: false,
    hasTelegram: false,
    hasTwitter: false,
    facebook: "",
    instagram: "",
    linkedIn: "",
    medium: "",
    telegram: "",
    twitter: "",
    iconColor: "#FFFFFF",
  },
};

export const FAILED_TO_LOAD: BlogPost = {
  title: "Failed to load",
  description: "Failed to load",
  tags: ["Failed to load"],
  body: "Failed to load",
};
