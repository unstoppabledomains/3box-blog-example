import { AppState } from "types/app";
import {
  AppAction,
  ADD_BOX,
  LOG_IN,
  LOG_OUT,
  ADD_POST,
  SET_POSTS,
  DELETE_POST,
  SET_CONFIG,
  SET_MODERATORS,
  SET_MODERATOR_NAMES,
  UPDATE_AUTH,
} from "types/actions";

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case SET_CONFIG: {
      return { ...state, ...action.value } as AppState;
    }
    case ADD_BOX: {
      return { ...state, box: action.value.box } as AppState;
    }
    case UPDATE_AUTH: {
      return { ...state, user: { ...state.user, loading: true } } as AppState;
    }
    case LOG_IN: {
      const { user, thread, space, box, moderators } = action.value;
      return { ...state, user, thread, space, box, moderators } as AppState;
    }
    case LOG_OUT: {
      return {
        ...state,
        user: {
          loggedIn: false,
          loading: false,
        },
        thread: null,
        space: null,
        box: null,
      } as AppState;
    }
    case ADD_POST: {
      const posts = state.posts || [];
      posts.unshift(action.value.post);
      return { ...state, posts } as AppState;
    }
    case SET_POSTS: {
      return { ...state, posts: action.value.posts } as AppState;
    }
    case DELETE_POST: {
      const { postId } = action.value;
      const index = state.posts?.findIndex(
        (post) => post.threadData?.postId === postId
      );
      let posts = state.posts ? [...state.posts] : [];
      if (typeof index !== "undefined" && index > -1) {
        posts.splice(index, 1);
      }

      return { ...state, posts } as AppState;
    }
    case SET_MODERATORS: {
      const { moderators } = action.value;
      return { ...state, moderators } as AppState;
    }
    case SET_MODERATOR_NAMES: {
      const { moderatorNames } = action.value;
      return { ...state, moderatorNames } as AppState;
    }
    default:
      throw new Error();
  }
};

export default appReducer;
