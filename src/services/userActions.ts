import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext, User, AppState } from "types/app";
import localStorageTest from "utils/localStorageTest";
import Box from "3box";

const web3Alert = `This website utilizes Web3 technology to manage authentication and decentralized storage. To enable these features please enable cookies for this website in your browser settings.

You will still be able to read articles, however other features will not be available.`;

export const loginTimeout = ({ state, dispatch }: AppContext) => async (
  initialBox?: any,
  initialState?: AppState
) =>
  new Promise<User | undefined>((resolve, reject) => {
    console.log("start loginTimeout");
    login({ state, dispatch })(initialBox, initialState)
      .then((res) => resolve(res))
      .catch((res) => reject(res));
    setTimeout(() => {
      reject("Timed out");
      window.alert(web3Alert);
      return;
    }, 15000);
  });

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any,
  initialState?: AppState
) => {
  console.log("start login()");
  console.time("finish login");
  try {
    if (!localStorageTest()) {
      window.alert(web3Alert);
      throw new Error("Local storage is not enabled to use 3Box profiles");
    }

    const box =
      initialBox || state.box || (await initBox({ state, dispatch })());
    console.log("box", box);
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
    console.log("start auth for", walletAddress);
    console.time("finish space auth");
    const isAdmin = walletAddress.toLowerCase() === adminWallet.toLowerCase();
    await box.auth([spaceName], { address: walletAddress });
    await box.syncDone;
    console.timeLog("finish space auth");

    console.log("open space", spaceName);
    console.time("finish open space");
    const userSpace = await box.openSpace(spaceName);
    console.timeLog("finish open space");
    console.log("start space sync");
    console.time("finish space sync");
    await userSpace.syncDone;
    console.timeLog("finish space sync");

    let thread;
    let space;
    if (isAdmin) {
      space = userSpace;
      thread = await userSpace.joinThreadByAddress(threadAddress);
      thread.onUpdate(() => getPosts({ state, dispatch })());
    }
    console.log("fetch profile");
    const { profile } = await Box.profileGraphQL(`{
      profile(id: "${walletAddress}") {
        image
      }
	}`);
    console.log("fetched profile", profile);

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
    console.timeLog("finish login");
    return user as User;
  } catch (error) {
    console.log("error login()");
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
