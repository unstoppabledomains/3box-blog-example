import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext, User, AppState } from "types/app";

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any,
  initialState?: AppState
) => {
  try {
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
    const profilePromise = box.public.all();

    const userSpace = await box.openSpace(spaceName);
    await userSpace.syncDone;
    let thread;
    let space;
    if (isAdmin) {
      space = userSpace;
      thread = await userSpace.joinThreadByAddress(threadAddress);
      thread.onUpdate(() => getPosts({ state, dispatch })());
    }

    // TODO promise.all
    const profile = await profilePromise;
    const profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image[0].contentUrl["/"]}`;

    const user = {
      walletAddress,
      loggedIn: true,
      profileImg,
      bookmarksSpace: userSpace,
    };
    try {
      window.localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      // TODO better way to handle storage not allowed?
      console.error(error);
    }

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
