import React from "react";
import { BlogPost } from "types/blog";
import { AppAction } from "./appReducer";

interface User {
  loggedIn: boolean;
  walletAddress?: string;
  profileImg?: string | any;
}

export interface AppState {
  box: any;
  space: any;
  thread: any;
  user: User;
  posts?: BlogPost[];
}

export interface AppContext {
  state: AppState;
  dispatch: any;
  //   dispatch: (state: AppState, action: AppAction) => AppState;
}

export const initialState = {
  box: null,
  space: null,
  thread: null,
  user: {
    loggedIn: false,
  },
  posts: [],
};

const appContext = React.createContext<AppContext>({
  state: initialState,
  dispatch: (state: AppState, action: AppAction) => {
    console.log("No dispatch");
    return state;
  },
});

export default appContext;
