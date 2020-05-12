# 3Box React Blog

A React & Typescript blog that uses decentralized storage and 3Box profiles.

## How to use

```sh
yarn
yarn start
```

This will run the website with whatever blog is specified in `public/config.json`.

To create a new blog you will have run `src/utils/createThread.ts` and then update `public/config.json` with the new _domain, threadAddress, spaceName, & adminWallet_.

## How It Works

**Make sure the [`blogConfig.json`](public/config.json) is set up properly**

The app use's React [`useContext`](src/services/appContext.ts) & [`useReducer`](src/services/appReducer.ts) function to maintain a global app state.

```ts
// State:
interface AppState {
  box: any;
  space: any;
  thread: any;
  user: {
    loggedIn: boolean;
    walletAddress?: string;
    profileImg?: string;
  };
  posts?: BlogPost[];
}

// Actions:
type ActionTypes =
  | typeof ADD_BOX
  | typeof LOG_IN
  | typeof LOG_OUT
  | typeof ADD_POST
  | typeof SET_POSTS
  | typeof DELETE_POST;
```

## Libraries

- [Material UI - React & Typescript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript)

- [3Box](https://docs.3box.io/api/index)
  - [auth](https://docs.3box.io/api/auth)
  - [profiles](https://docs.3box.io/api/profiles/get)
  - [threads](https://docs.3box.io/api/messaging)
  - [3box-comments-react](https://github.com/3box/3box-comments-react)
