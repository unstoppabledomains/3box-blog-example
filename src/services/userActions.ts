import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext, User, AppState } from "types/app";
import localStorageTest from "utils/localStorageTest";
import Box from "3box";

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any,
  initialState?: AppState
) => {
  try {
    if (!localStorageTest()) {
      window.alert("Local storage must be enabled");
      throw new Error("Local storage not enabled to use 3Box profiles");
    }

    const box =
      initialBox || state.box || (await initBox({ state, dispatch })());
    const { spaceName, threadAddress, adminWallet } = initialState || state;
    let walletAddress = "";
    try {
      walletAddress = (await (window as any).ethereum.enable())[0];
    } catch (e) {
      console.error(e);
      window.localStorage.setItem("isLoggedIn", "false");
      await logout({ state, dispatch })();
      return { loggedIn: false, walletAddress: "" };
    }
    const isAdmin = walletAddress.toLowerCase() === adminWallet.toLowerCase();
    await box.auth([spaceName], { address: walletAddress });
    await box.syncDone;

    const userSpace = await box.openSpace(spaceName);
    await userSpace.syncDone;

    let thread;
    let space;
    if (isAdmin) {
      space = userSpace;
      thread = await userSpace.joinThreadByAddress(threadAddress);
      thread.onUpdate(() => getPosts({ state, dispatch })());
    }
    const { profile } = await Box.profileGraphQL(`{
      profile(id: "${walletAddress}") {
        image
      }
    }`);
    let profileImg = "";
    if (typeof profile.image !== "undefined") {
      profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image}`;
    }

    const user = {
      walletAddress,
      loggedIn: true,
      profileImg,
      bookmarksSpace: userSpace,
    };
    localStorage.setItem("isLoggedIn", "true");

    dispatch({
      type: LOG_IN,
      value: {
        box,
        space,
        thread,
        user,
      },
    });
    return user as User;
  } catch (error) {
    console.error(error);
  }
};

export const logout = ({ state, dispatch }: AppContext) => async () => {
  const { box } = state;
  await box.logout();
  window.localStorage.setItem("isLoggedIn", "false");
  dispatch({ type: LOG_OUT });
};

// Bookmarks
export const getBookmarks = ({ state, dispatch }: AppContext) => async () => {
  const {
    user: { bookmarksSpace },
  } = state;
  const bookmarkIds: string[] =
    JSON.parse(await bookmarksSpace.private.get("bookmarks")) || [];
  const posts =
    state.posts && state.posts.length > 0
      ? state.posts
      : await getPosts({ state, dispatch })();
  const bookmarks = posts.filter(
    (post) => post.threadData && bookmarkIds.includes(post.threadData?.postId)
  );
  return bookmarks;
};

export const checkBookmarked = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const {
    user: { loggedIn, bookmarksSpace },
  } = state;
  if (!loggedIn || !bookmarksSpace) {
    return false;
  }
  const bookmarkIds = await bookmarksSpace.private.get("bookmarks");
  return bookmarkIds ? JSON.parse(bookmarkIds).includes(postId) : false;
};

export const addBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const {
    user: { bookmarksSpace },
  } = state;
  const bookmarksString = await bookmarksSpace.private.get("bookmarks");
  const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  bookmarks.push(postId);
  return bookmarksSpace.private.set("bookmarks", JSON.stringify(bookmarks));
};

export const removeBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const {
    user: { bookmarksSpace },
  } = state;
  const bookmarksString = await bookmarksSpace.private.get("bookmarks");
  const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  if (bookmarks) {
    const newBookmarks = bookmarks.filter((id: string) => id !== postId);
    return bookmarksSpace.private.set(
      "bookmarks",
      JSON.stringify(newBookmarks)
    );
  }
  return bookmarksSpace.private.set("bookmarks", "[]");
};
