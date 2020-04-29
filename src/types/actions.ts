import { BlogPost } from "./app";

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
