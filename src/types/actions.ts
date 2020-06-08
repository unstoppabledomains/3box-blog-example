import { BlogPost } from "./app";

export const SET_CONFIG = "SET_CONFIG";
export const ADD_BOX = "ADD_BOX";
export const UPDATE_AUTH = "UPDATE_AUTH";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const ADD_POST = "ADD_POST";
export const SET_POSTS = "SET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const SET_MODERATORS = "SET_MODERATORS";
export const SET_MODERATOR_NAMES = "SET_MODERATOR_NAMES";

export type ActionTypes =
  | typeof SET_CONFIG
  | typeof ADD_BOX
  | typeof UPDATE_AUTH
  | typeof LOG_IN
  | typeof LOG_OUT
  | typeof ADD_POST
  | typeof SET_POSTS
  | typeof DELETE_POST
  | typeof SET_MODERATORS
  | typeof SET_MODERATOR_NAMES;

export interface AppAction {
  type: ActionTypes;
  value?: BlogPost | any; // todo: improve
}
