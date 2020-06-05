import Box from "3box";
import {
  BlogPost,
  ThreadObject,
  AppContext,
  ConfigFile,
  DraftPost,
  AppState,
} from "types/app";
import {
  SET_POSTS,
  DELETE_POST,
  ADD_POST,
  ADD_BOX,
  SET_CONFIG,
  SET_MODERATORS,
  SET_MODERATOR_NAMES,
} from "types/actions";
import parseMessage from "utils/parseMessage";
import { loginTimeout } from "./userActions";
// import { login } from "./userActions";
import createTheme from "utils/createTheme";
import localStorageTest from "utils/localStorageTest";
import fm from "front-matter";

export const initApp = ({ state, dispatch }: AppContext) => async () => {
  const config: ConfigFile = await fetch(
    `${process.env.PUBLIC_URL}/config.json`
  ).then((res) => res.json());
  const { primary, secondary, background } = config.theme;
  const theme = createTheme(primary, secondary, background);

  const newState: AppState = {
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
    if (localStorageTest()) {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        await loginTimeout({ state, dispatch })(box, newState);
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const initBox = ({ state, dispatch }: AppContext) => async () => {
  if (!state.box && window.navigator.cookieEnabled && localStorageTest()) {
    try {
      const provider = await Box.get3idConnectProvider();
      // Pass eth provider instead
      const box = await Box.create(provider);
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
export const getPosts = ({ state, dispatch }: AppContext) => async (
  forceUpdate = false
) => {
  const { thread, threadAddress } = state;
  if (!forceUpdate && state.posts && state.posts.length > 0) {
    // TODO compare timestamp of latest post to check refresh
    return state.posts;
  }

  const postThreads: ThreadObject[] = thread
    ? await thread.getPosts()
    : await Box.getThreadByAddress(threadAddress);

  const threadAuthors = postThreads.map((thread) => thread.author);
  const authors = [...new Set(threadAuthors)];
  const names = await Promise.all(
    authors.map(async (a) => ({
      [a]: (await Box.getProfile(a)).name || a,
    }))
  );
  let moderatorNames = {};
  names.forEach((obj) => {
    moderatorNames = { ...moderatorNames, ...obj };
  });
  const posts = postThreads
    .map((post) => parseMessage(post, moderatorNames))
    .sort((a: any, b: any) =>
      a.threadData.timestamp < b.threadData.timestamp ? 1 : -1
    );

  dispatch({ type: SET_POSTS, value: { posts } });
  dispatch({ type: SET_MODERATOR_NAMES, value: { moderatorNames } });
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

const msToSec = (a: number) => (a - (a % 1000)) / 1000;

export const addPost = ({ state, dispatch }: AppContext) => async (
  newPost: BlogPost
) => {
  const {
    thread,
    moderatorNames,
    user: { did3 },
  } = state;
  const timestamp = msToSec(new Date().getTime());
  console.log(timestamp);

  if (!thread) {
    throw new Error("No thread found. Must authenticate");
  }
  const message = `---
createdAt: ${timestamp}
updatedAt: ${timestamp}
title: ${newPost.title}
description: ${newPost.description}
tags: ${newPost.tags.join(",")}
---
${newPost.body}`;
  fm.test(message);

  const postId: string = await thread.post(message);
  const post = parseMessage(
    {
      postId,
      timestamp,
      message,
      author: did3 || "",
    },
    moderatorNames
  );
  dispatch({
    type: ADD_POST,
    value: { post },
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
  const {
    space,
    user: { isAdmin },
  } = state;
  const timestamp = msToSec(new Date().getTime());

  if (!space) {
    throw new Error("No space found. Must authenticate");
  }
  if (!isAdmin) {
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
  const {
    space,
    user: { isAdmin },
  } = state;
  if (!space) {
    throw new Error("No space found. Must authenticate");
  }
  if (!isAdmin) {
    throw new Error("Not admin user");
  }
  const draftsString = await space.private.get("drafts");
  const drafts: DraftPost[] = draftsString ? JSON.parse(draftsString) : [];
  drafts.filter((draft) => draft.id !== draftId);
  await space.private.set("drafts", JSON.stringify(drafts));
};

export const getDrafts = ({ state, dispatch }: AppContext) => async () => {
  const {
    space,
    moderatorNames,
    user: { isAdmin, did3 },
  } = state;
  if (!space) {
    throw new Error("No space found. Must authenticate");
  }

  if (!isAdmin) {
    throw new Error("Not admin user");
  }
  const draftsString = await space.private.get("drafts");
  const drafts: DraftPost[] = draftsString ? JSON.parse(draftsString) : [];
  const author =
    moderatorNames && did3 && moderatorNames[did3]
      ? moderatorNames[did3]
      : did3;
  return drafts.length > 0
    ? drafts.map((draft) =>
        parseMessage({
          author: author || "",
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
  if (box) {
    const likesThread = await box.openThread(
      spaceName,
      `${spaceName}-${postId}-likes`,
      {
        firstModerator: adminWallet,
        members: false,
      }
    );
    return (await likesThread.getPosts()).length;
  }
  return -1;
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

export const addModerator = ({ state, dispatch }: AppContext) => async (
  newModeratorAddress: string
) => {
  const { user, thread } = state;
  if (!user.isAdmin) {
    throw new Error("User must be admin to add a moderator");
  } else if (!thread) {
    throw new Error("Thread does not exist");
  }
  await thread.addModerator(newModeratorAddress);
  const moderators = await thread.listModerators();
  dispatch({ type: SET_MODERATORS, value: { moderators } });
};
