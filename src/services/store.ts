// store.ts
import React, { Props } from "react";
import { BlogPost } from "types/blog";

interface User {
  loggedIn: boolean;
  walletAddress?: string;
  profileImg?: string | any;
}

export interface AppState {
  box: any;
  space: any;
  thread: any;
  user: User;
  posts?: BlogPost[];
}

const initialState = {
  box: null,
  space: null,
  thread: null,
  user: {
    loggedIn: false,
  },
  posts: [],
};

const store = React.createContext<AppState>(initialState);

// const StateProvider:React.FunctionComponent = ({ children }) => {
//   const Provider = store.Provider;
//   const [state, dispatch] = React.useReducer(
//     (state: AppState, action: AppAction) => {
//       switch (action.type) {
//         case ADD_POST:
//         // const newState = // do something with the action
//         // return newState;
//         default:
//           throw new Error();
//       }
//     }
//   );

//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
// };

// export { store, StateProvider }
