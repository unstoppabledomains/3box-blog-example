import Box from "3box";
import {
  BlogPost,
  ThreadObject,
  AppContext,
  ConfigFile,
  DraftPost,
} from "types/app";
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
import localStorageTest from "utils/localStorageTest";

export const initApp = ({ state, dispatch }: AppContext) => async () => {
  console.log("initApp");

  const config: ConfigFile = await fetch(
    `${process.env.PUBLIC_URL}/config.json`
  ).then((res) => res.json());
  const { primary, secondary, background } = config.theme;
  const theme = createTheme(primary, secondary, background);
  const newState = {
    ...state,
    ...config,
    theme,
  };
  dispatch({
    type: SET_CONFIG,
    value: newState,
  });
  try {
    const box = await initBox({ state, dispatch })();
    console.log("box post init", box);
    if (localStorageTest()) {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn === "true") {
        await login({ state, dispatch })(box, newState);
        console.log("Finished login()");
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const initBox = ({ state, dispatch }: AppContext) => async () => {
  console.log("initBox");

  if (!state.box && window.navigator.cookieEnabled && localStorageTest()) {
    try {
      const provider = await Box.get3idConnectProvider();
      console.log("provider", provider);

      const box = await Box.create(provider);
      console.log("box", box);
      dispatch({ type: ADD_BOX, value: { box } });
      return box;
    } catch (error) {
      console.error("box error:", error);
      return null;
    }
  }
  return state.box;
};

// Posts
export const getPosts = ({ state, dispatch }: AppContext) => async () => {
  const { thread, threadAddress } = state;
  if (state.posts && state.posts.length > 0) {
    // TODO compare timestamp of latest post to check refresh
    return state.posts;
  }

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

// Drafts
export const addDraft = ({ state, dispatch }: AppContext) => async (
  post: BlogPost
) => {
  const { space, adminWallet, user } = state;
  const timestamp = new Date().getTime();
  if (!space) {
    throw new Error("No space found. Must authenticate");
  }
  if (user.walletAddress?.toLowerCase() !== adminWallet.toLowerCase()) {
    throw new Error("Not admin user");
  }
  const newPost = `---
createdAt: ${timestamp}
updatedAt: ${timestamp}
title: ${post.title}
description: ${post.description}
tags: ${post.tags.join(",")}
---
${post.body}`;
  const draftsString = await space.private.get("drafts");
  const drafts: DraftPost[] = draftsString ? JSON.parse(draftsString) : [];
  const draftId = drafts.length.toString();
  drafts.unshift({ id: draftId, post: newPost });
  await space.private.set("drafts", JSON.stringify(drafts));
};

export const removeDraft = ({ state, dispatch }: AppContext) => async (
  draftId: string
) => {
  const { space, adminWallet, user } = state;
  if (!space) {
    throw new Error("No space found. Must authenticate");
  }
  if (user.walletAddress?.toLowerCase() !== adminWallet.toLowerCase()) {
    throw new Error("Not admin user");
  }
  const draftsString = await space.private.get("drafts");
  const drafts: DraftPost[] = draftsString ? JSON.parse(draftsString) : [];
  drafts.filter((draft) => draft.id !== draftId);
  await space.private.set("drafts", JSON.stringify(drafts));
};

export const getDrafts = ({ state, dispatch }: AppContext) => async () => {
  const { space, adminWallet, user } = state;
  if (!space) {
    throw new Error("No space found. Must authenticate");
  }

  if (user.walletAddress?.toLowerCase() !== adminWallet.toLowerCase()) {
    throw new Error("Not admin user");
  }
  const draftsString = await space.private.get("drafts");
  const drafts: DraftPost[] = draftsString ? JSON.parse(draftsString) : [];

  return drafts.length > 0
    ? drafts.map((draft) =>
        parseMessage({
          author: adminWallet,
          message: draft.post,
          postId: draft.id,
          timestamp: new Date().getTime(),
        })
      )
    : [];
};

// Likes
export const getLikes = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { box, spaceName, adminWallet } = state;
  const likesThread = await box.openThread(
    spaceName,
    `${spaceName}-${postId}-likes`,
    {
      firstModerator: adminWallet,
      members: false,
    }
  );
  return (await likesThread.getPosts()).length;
};

export const checkLiked = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const {
    user: { walletAddress, loggedIn },
    spaceName,
    adminWallet,
    box,
  } = state;
  if (!loggedIn || !walletAddress) {
    return false;
  }

  const likesThread = await box.openThread(
    spaceName,
    `${spaceName}-${postId}-likes`,
    {
      firstModerator: adminWallet,
      members: false,
    }
  );
  const likes = await likesThread.getPosts();
  return (
    likes.filter((tObj: ThreadObject) => tObj.message === walletAddress)
      .length > 0
  );
};

export const addLike = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { user, spaceName, box, adminWallet } = state;
  if (!user.loggedIn) {
    throw new Error("User must be logged in to add likes");
  }

  const likesThread = await box.openThread(
    spaceName,
    `${spaceName}-${postId}-likes`,
    {
      firstModerator: adminWallet,
      members: false,
    }
  );
  await likesThread.post(user.walletAddress?.toLowerCase());
};

export const removeLike = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { user, spaceName, box, adminWallet } = state;
  if (!user.loggedIn) {
    throw new Error("User must be logged in to remove likes");
  }
  const likesThread = await box.openThread(
    spaceName,
    `${spaceName}-${postId}-likes`,
    {
      firstModerator: adminWallet,
      members: false,
    }
  );
  const post = (await likesThread.getPosts()).filter(
    (like: { message: string }) =>
      like.message.toLowerCase() === user.walletAddress?.toLowerCase()
  );
  await likesThread.deletePost(post[0].postId);
};
