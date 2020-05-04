import { LOG_IN, LOG_OUT } from "types/actions";
import { initBox, getPosts } from "./blogActions";
import { AppContext } from "types/app";

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

    const thread = await space.joinThreadByAddress(threadAddress);
    thread.onUpdate(() => getPosts({ state, dispatch })());

    const profile = await profilePromise;
    const profileImg = `${process.env.REACT_APP_IPFS_URL}/${profile.image[0].contentUrl["/"]}`;

    const user = {
      walletAddress,
      loggedIn: true,
      profileImg,
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
    return user;
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
