import Box from "3box";
import config from "config/blogConfig.json";
import { AppContext } from "services/appContext";
import { ADD_BOX, LOG_IN } from "./appReducer";

export const initApp = ({ state, dispatch }: AppContext) => async () => {
  const provider = await Box.get3idConnectProvider();
  const box = await Box.create(provider);
  dispatch({ type: ADD_BOX, value: { box } });
  return box;
};

export const login = ({ state, dispatch }: AppContext) => async () => {
  try {
    const box = state.box || (await initApp({ state, dispatch })());
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
    const user = {
      walletAddress,
      loggedIn: true,
      profileImg: profile.image[0],
    };

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
