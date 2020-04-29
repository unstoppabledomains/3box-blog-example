import { AppState } from "types/app";
import {
  AppAction,
  ADD_BOX,
  LOG_IN,
  LOG_OUT,
  ADD_POST,
  SET_POSTS,
  DELETE_POST,
} from "types/actions";

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
