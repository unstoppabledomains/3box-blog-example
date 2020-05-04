import Box from "3box";
import { BlogPost, ThreadObject, AppContext, ConfigFile } from "types/app";
import {
  SET_POSTS,
  DELETE_POST,
  ADD_POST,
  ADD_BOX,
  SET_CONFIG,
} from "types/actions";
import parseMessage from "utils/parseMessage";
import { login } from "./userActions";
import createTheme from "utils/createTheme";

export const initApp = ({ state, dispatch }: AppContext) => async () => {
  const config: ConfigFile = await fetch(
    `${process.env.PUBLIC_URL}/config.json`
  ).then((res) => res.json());
  const { primary, secondary, background } = config.theme;
  const theme = createTheme(primary, secondary, background);
  dispatch({
    type: SET_CONFIG,
    value: {
      ...config,
      theme,
      //   domain: config.domain,
      //   title: config.title,
      //   threadAddress: config.threadAddress,
      //   adminWallet: config.adminWallet,
      //   spaceName: config.spaceName,
    },
  });
  await initBox({ state, dispatch })();
};

export const initBox = ({ state, dispatch }: AppContext) => async () => {
  if (!state.box) {
    const provider = await Box.get3idConnectProvider();
    const box = await Box.create(provider);
    dispatch({ type: ADD_BOX, value: { box } });
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      await login({ state, dispatch })(box);
    }
    return box;
  }
  return state.box;
};

export const getPosts = ({ state, dispatch }: AppContext) => async () => {
  const { thread, threadAddress } = state;

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
  const { thread, adminWallet } = state;
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
  // TODO covert adminWallet to user name
  // TODO covert adminWallet/3ID to user name in Read

  dispatch({
    type: ADD_POST,
    value: {
      post: {
        ...post,
        threadData: {
          postId,
          timestamp,
          message: newPost,
          author: adminWallet,
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
