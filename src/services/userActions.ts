import { LOG_IN, LOG_OUT, UPDATE_AUTH } from "types/actions";
import { getPosts } from "./blogActions";
import { AppContext, User } from "types/app";
import localStorageTest from "utils/localStorageTest";
import Box from "3box";

const web3Alert = `This website utilizes Web3 technology to manage authentication and decentralized storage. To enable these features please enable cookies for this website in your browser settings.

You will still be able to read articles, however other features will not be available.`;

export const loginTimeout = ({ state, dispatch }: AppContext) => async () =>
  new Promise<User | undefined>((resolve, reject) => {
    console.log("start loginTimeout");
    const loginTimer = setTimeout(() => {
      reject("Timed out");
      window.alert(web3Alert);
      return;
    }, 180000);
    login({ state, dispatch })()
      .then((res) => {
        resolve(res);
        clearTimeout(loginTimer);
      })
      .catch((res) => reject(res));
  });

export const login = ({ state, dispatch }: AppContext) => async () => {
  dispatch({ type: UPDATE_AUTH });
  const windowObj = window as any;
  console.log("start auth");
  console.time("finish login");
  try {
    if (!localStorageTest()) {
      window.alert(web3Alert);
      throw new Error("Local storage is not enabled to use 3Box profiles");
    } else if (
      typeof window.ethereum === "undefined" &&
      (typeof window.web3 === "undefined" ||
        typeof window.web3.currentProvider === "undefined")
    ) {
      // TODO Window alert
      throw new Error("No web3 provider");
    }
    const provider =
      (walletConnect && windowObj.walletConnect) ||
      windowObj.ethereum ||
      windowObj.web3.currentProvider;
    const walletAddress = (await provider.enable())[0];
    if (!walletAddress) {
      throw new Error("No wallet address found");
    }
    const { spaceName, threadAddress } = state;

    console.time("finish box");
    const box = state.box || (await Box.create());
    console.timeLog("finish box");

    console.log("open space", spaceName);
    console.time("finish open space");
    const space = await box.auth([spaceName], {
      address: walletAddress,
      provider,
    });
    console.timeLog("finish open space");

    console.time("finish open thread");
    const thread = await space.joinThreadByAddress(threadAddress);
    console.timeLog("finish open thread");
    const userDid3 = thread._user.DID;

    const moderators: string[] = (
      await thread.listModerators()
    ).map((m: string) => m.toLowerCase());

    const { profile } = await Box.profileGraphQL(`{
      profile(id: "${walletAddress}") {
        image
      }
	}`);

    let profileImg = "";
    if (profile && profile.image) {
      profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image}`;
    }

    const user: User = {
      walletAddress,
      loggedIn: true,
      loading: false,
      profileImg,
      bookmarksSpace: space,
      isAdmin: moderators.includes(userDid3),
      did3: userDid3,
    };
    localStorage.setItem("isLoggedIn", "true");
    console.time("finish syncs");
    await Promise.all([box.syncDone, space.syncDone]);
    console.timeLog("finish syncs");
    dispatch({
      type: LOG_IN,
      value: {
        box,
        space,
        thread,
        user,
        moderators,
      },
    });
    console.timeLog("finish login");
    return user as User;
  } catch (error) {
    console.error(error);
    await logout({ state, dispatch })();
    return { loggedIn: false, loading: false, walletAddress: "" };
  }
};

export const logout = ({ state, dispatch }: AppContext) => async () => {
  dispatch({ type: UPDATE_AUTH });
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
