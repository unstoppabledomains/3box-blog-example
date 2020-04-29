import React from "react";
import { AppContext, initialState, AppState } from "types/app";
import { AppAction } from "types/actions";

const appContext = React.createContext<AppContext>({
  state: initialState,
  dispatch: (state: AppState, action: AppAction) => {
    console.log("No dispatch");
    return state;
  },
});

export default appContext;
