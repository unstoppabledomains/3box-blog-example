import Box from "3box";
import { BlogPost, ThreadObject } from "types/blog";
import { AppContext } from "./appContext";
import * as config from "config/blogConfig.json";
import { ADD_POSTS, DELETE_POST, ADD_POST } from "./appReducer";
import parseMessage from "utils/parseMessage";
import { login } from "./userActions";

export const getPosts = ({ state, dispatch }: AppContext) => async () => {
  const { thread } = state;
  const { threadAddress } = config;
  const postThreads: ThreadObject[] = thread
    ? await thread.getPosts()
    : await Box.getThreadByAddress(threadAddress);
  const posts = postThreads.map((post) => parseMessage(post));
  dispatch({ type: ADD_POSTS, value: posts });
  return posts;
};

export const getPost = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const posts = state.posts || (await getPosts({ state, dispatch })());
  const post = posts?.filter((post) => post.threadData?.postId === postId)[0];
  return post;
};

export const addPost = ({ state, dispatch }: AppContext) => async (
  post: BlogPost
) => {
  const { thread } = state;
  if (!thread) {
    throw "No thread found. Must authenticate";
  }
  const newPost = `---
createdAt: ${new Date().getTime()}
updatedAt: ${new Date().getTime()}
title: ${post.title}
description: ${post.description}
tags: ${post.tags.join(",")}
---
${post.body}`;

  const postId: string = await thread.post(newPost);
  dispatch({ type: ADD_POST, value: postId });
  return postId;
};

export const deletePost = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { thread } = state;
  if (!thread) {
    throw "No thread found. Must authenticate";
  }
  await thread.deletePost(postId);
  dispatch({ type: DELETE_POST, value: postId });
};
