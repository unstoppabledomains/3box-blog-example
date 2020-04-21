import React from "react";
import Blog from "./Blog";

export interface AppState {
  blog: Blog;
}

export default React.createContext<AppState>({
  blog: new Blog(),
  //   loading: true,
  //   setLoading: (loading: boolean) => {},
});
