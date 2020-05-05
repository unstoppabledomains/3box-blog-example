import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext, User, BlogPost } from "types/app";

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any
) => {
  try {
    const box =
      initialBox || state.box || (await initBox({ state, dispatch })());
    const { spaceName, threadAddress, adminWallet } = state;
    let walletAddress = "";
    try {
      walletAddress = (await (window as any).ethereum.enable())[0];
    } catch (e) {
      console.error(e);
      window.localStorage.setItem("isLoggedIn", "false");
      await logout({ state, dispatch })();
      return { loggedIn: false, walletAddress: "" };
    }

    await box.auth([spaceName], { address: walletAddress });
    await box.syncDone;
    const profilePromise = box.public.all();

    const space = await box.openSpace(spaceName);
    await space.syncDone;
    const bookmarkPromise = space.private.get("bookmarks");
    let thread;
    if (walletAddress === adminWallet) {
      thread = await space.joinThreadByAddress(threadAddress);
      thread.onUpdate(() => getPosts({ state, dispatch })());
    }

    // TODO promise.all
    const profile = await profilePromise;
    const profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image[0].contentUrl["/"]}`;
    const bookmarkIds = await bookmarkPromise;
    const bookmarks = bookmarkIds ? JSON.parse(bookmarkIds) : [];

    const user = {
      walletAddress,
      loggedIn: true,
      profileImg,
      bookmarks,
    };

    window.localStorage.setItem("isLoggedIn", "true");
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
  const { space } = state;
  const bookmarkIds: string[] = JSON.parse(
    await space.private.get("bookmarks")
  );
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
    user: { loggedIn },
    space,
  } = state;
  if (!loggedIn || !space) {
    return false;
  }
  const bookmarkIds = await space.private.get("bookmarks");
  return bookmarkIds ? JSON.parse(bookmarkIds).includes(postId) : false;
};

export const addBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { space } = state;
  const bookmarks: string[] = JSON.parse(
    (await space.private.get("bookmarks")) || "[]"
  );
  bookmarks.push(postId);
  return space.private.set("bookmarks", JSON.stringify(bookmarks));
};

export const removeBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { space } = state;
  const bookmarks = JSON.parse(await space.private.get("bookmarks"));
  if (bookmarks) {
    const newBookmarks = bookmarks.filter((id: string) => id !== postId);
    return space.private.set("bookmarks", JSON.stringify(newBookmarks));
  }
  return space.private.set("bookmarks", "[]");
};
