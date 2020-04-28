import { AppState } from "./appContext";
import { BlogPost } from "types/blog";

export const ADD_BOX = "ADD_BOX";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const ADD_POST = "ADD_POST";
export const SET_POSTS = "SET_POSTS";
export const DELETE_POST = "DELETE_POST";

export type ActionTypes =
  | typeof ADD_BOX
  | typeof LOG_IN
  | typeof LOG_OUT
  | typeof ADD_POST
  | typeof SET_POSTS
  | typeof DELETE_POST;

export interface AppAction {
  type: ActionTypes;
  value?: BlogPost | any; // todo: improve
}

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case ADD_BOX: {
      return { ...state, box: action.value.box } as AppState;
    }
    case LOG_IN: {
      const { user, thread, space, box } = action.value;
      return { ...state, user, thread, space, box } as AppState;
    }
    case LOG_OUT: {
      return {
        ...state,
        user: {
          loggedIn: false,
        },
        thread: null,
        space: null,
        box: null,
      } as AppState;
    }
    case ADD_POST: {
      const posts = state.posts?.unshift(action.value.post);
      return { ...state, posts } as AppState;
    }
    case SET_POSTS: {
      return { ...state, posts: action.value.posts } as AppState;
    }
    case DELETE_POST: {
      const index = state.posts?.findIndex(
        (post) => post.threadData?.postId === action.value
      );
      const posts = index ? state.posts?.splice(index, 1) : state.posts;
      return { ...state, posts } as AppState;
    }
    default:
      throw new Error();
  }
};

export default appReducer;
