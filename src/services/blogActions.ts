import Box from "3box";
import { BlogPost, ThreadObject } from "types/blog";
import { AppContext } from "./appContext";
import config from "config/blogConfig.json";
import { SET_POSTS, DELETE_POST, ADD_POST, ADD_BOX } from "./appReducer";
import parseMessage from "utils/parseMessage";

export const initBox = ({ state, dispatch }: AppContext) => async () => {
  const provider = await Box.get3idConnectProvider();
  const box = await Box.create(provider);
  dispatch({ type: ADD_BOX, value: { box } });
  return box;
};

export const getPosts = ({ state, dispatch }: AppContext) => async () => {
  const { thread } = state;
  const { threadAddress } = config;
  const postThreads: ThreadObject[] = thread
    ? await thread.getPosts()
    : await Box.getThreadByAddress(threadAddress);
  const posts = postThreads
    .map((post) => parseMessage(post))
    .sort((a: any, b: any) =>
      a.threadData.timestamp < b.threadData.timestamp ? 1 : -1
    );

  dispatch({ type: SET_POSTS, value: { posts } });
  return posts;
};

export const getPost = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const posts =
    state.posts && state.posts.length > 0
      ? state.posts
      : await getPosts({ state, dispatch })();
  const post = posts?.filter((post) => post.threadData?.postId === postId)[0];
  if (post) {
    return post;
  } else {
    throw new Error("No post found");
  }
};

export const addPost = ({ state, dispatch }: AppContext) => async (
  post: BlogPost
) => {
  const { thread } = state;
  const timestamp = new Date().getTime();
  if (!thread) {
    throw new Error("No thread found. Must authenticate");
  }
  const newPost = `---
createdAt: ${timestamp}
updatedAt: ${timestamp}
title: ${post.title}
description: ${post.description}
tags: ${post.tags.join(",")}
---
${post.body}`;

  const postId: string = await thread.post(newPost);

  dispatch({
    type: ADD_POST,
    value: {
      post: {
        ...post,
        threadData: {
          postId,
          timestamp,
          message: newPost,
          author: config.adminWallet,
        },
      },
    },
  });
  return postId;
};

export const deletePost = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { thread } = state;
  if (!thread) {
    throw new Error("No thread found. Must authenticate");
  }
  await thread.deletePost(postId);
  dispatch({ type: DELETE_POST, value: { postId } });
};
