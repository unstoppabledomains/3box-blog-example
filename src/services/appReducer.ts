import { AppState } from "./appContext";
import { BlogPost } from "types/blog";

export const ADD_BOX = "ADD_BOX";
export const ADD_SPACE = "ADD_SPACE";
export const ADD_THREAD = "ADD_THREAD";
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";
export const LOG_IN = "LOG_IN";

export type ActionTypes =
  | typeof ADD_BOX
  | typeof LOG_IN
  | typeof ADD_SPACE
  | typeof ADD_THREAD
  | typeof ADD_POST
  | typeof ADD_POSTS
  | typeof DELETE_POST;

export interface AppAction {
  type: ActionTypes;
  value?: BlogPost | any; // todo: improve
}

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case ADD_POST:
      // const newState = // do something with the action
      return state;
    default:
      throw new Error();
  }
};

export default appReducer;
