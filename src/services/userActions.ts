import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext, User, BlogPost } from "types/app";

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any
) => {
  try {
    const box =
      initialBox || state.box || (await initBox({ state, dispatch })());
    const { spaceName, threadAddress } = state;
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
    console.log("got auth");
    await box.syncDone;
    console.log("got box sync");
    const profilePromise = box.public.all();

    const space = await box.openSpace(spaceName);
    await space.syncDone;
    const bookmarkIds = space.private.get("bookmarks");
    const thread = await space.joinThreadByAddress(threadAddress);
    thread.onUpdate(() => getPosts({ state, dispatch })());

    const profile = await profilePromise;
    const profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image[0].contentUrl["/"]}`;
    const bookmarks = JSON.parse(await bookmarkIds);

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

export const addBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { space } = state;
  const bookmarks: string[] = JSON.parse(await space.private.get("bookmarks"));
  bookmarks.push(postId);
  return space.private.set("bookmarks", bookmarks);
};

export const removeBookmark = ({ state, dispatch }: AppContext) => async (
  postId: string
) => {
  const { space } = state;
  const bookmarks: string[] = JSON.parse(
    await space.private.get("bookmarks")
  ).filter((id: string) => id !== postId);

  return space.private.set("bookmarks", bookmarks);
};
