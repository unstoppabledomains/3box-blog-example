// Interfaces
export interface AppContext {
  state: AppState;
  dispatch: any;
  //   dispatch: (state: AppState, action: AppAction) => AppState;
}
export interface AppState {
  box: any;
  space: any;
  thread: any;
  user: User;
  posts?: BlogPost[];
}

export interface User {
  loggedIn: boolean;
  walletAddress?: string;
  profileImg?: string;
}

export interface BlogPost {
  title: string;
  description: string;
  tags: string[];
  body: string;
  threadData?: ThreadObject;
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
};

export const FAILED_TO_LOAD: BlogPost = {
  title: "Failed to load",
  description: "Failed to load",
  tags: ["Failed to load"],
  body: "Failed to load",
};
