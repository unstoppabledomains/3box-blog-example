import config from "config/blogConfig.json";
import { AppContext } from "services/appContext";
import { LOG_IN, LOG_OUT } from "./appReducer";
import { initBox } from "./blogActions";

export const login = ({ state, dispatch }: AppContext) => async (
  initialBox?: any
) => {
  try {
    const box =
      initialBox || state.box || (await initBox({ state, dispatch })());
    const { spaceName, threadAddress } = config;
    const walletAddress = (await (window as any).ethereum.enable())[0];

    await box.auth([spaceName], { address: walletAddress });
    await box.syncDone;
    const profilePromise = box.public.all();

    const space = await box.openSpace(spaceName);
    await space.syncDone;

    const thread = await space.joinThreadByAddress(threadAddress);
    // TODO onUpdate for thread

    const profile = await profilePromise;
    const profileImg = `${process.env.REACT_APP_PINATA_BASE_URL}/${profile.image[0].contentUrl["/"]}`;

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
