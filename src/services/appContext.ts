import React from "react";
import { AppContext, initialState } from "types/app";
import { AppAction } from "types/actions";

const appContext = React.createContext<AppContext>({
  state: initialState,
  dispatch: (action: AppAction) => {
    console.log("No dispatch", action);
  },
});

export default appContext;
