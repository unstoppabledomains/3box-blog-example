import Box from "3box";
import * as config from "config/blogConfig.json";
import { AppContext } from "services/appContext";
import { ADD_BOX, LOG_IN } from "./appReducer";

export const initApp = ({ state, dispatch }: AppContext) => async () => {
  const _state = { ...state };
  const provider = await Box.get3idConnectProvider();
  _state.box = await Box.create(provider);
  dispatch({ type: ADD_BOX, value: { box: _state.box } });
};

export const login = ({ state, dispatch }: AppContext) => async () => {
  const { box } = state;
  const { spaceName, threadAddress } = config;
  const walletAddress =
    state.user.walletAddress || (await (window as any).ethereum.enable()[0]);
  box.auth(spaceName, { address: walletAddress });
  await box.syncDone;
  const space = await box.openSpace(spaceName);
  await space.syncDone;

  const thread = await space.joinThreadByAddress(threadAddress);
  // TODO onUpdate for thread

  const profile = await box.public.all();
  const user = {
    walletAddress,
    loggedIn: true,
    profileImg: profile.image,
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
};
