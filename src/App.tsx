import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/Write";
import BlogContext, { AppState } from "./services/AppContext";
import Blog from "./services/Blog";

const App: React.FunctionComponent = () => {
  const [appState, setAppState] = React.useState<AppState>({
    blog: new Blog(),
    loading: true,
    setLoading: (_loading: boolean) => {
      console.log("setLoading not set. Value:", _loading);
    },
  });
  const setLoading = (_loading: boolean) => {
    setAppState({ ...appState, loading: _loading });
  };
  const initData = async () => {
    await appState.blog.init();
    setLoading(false);
  };
  React.useState(() => {
    setAppState({ ...appState, setLoading });
    void initData();
  });
  return (
    <BlogContext.Provider value={appState}>
      <Router>
        <Header />
        <Switch>
          <Route path="/new">
            <NewPost />
          </Route>
          <Route path="/posts/:postId">Blog</Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer
          title="Unstoppable Blog"
          description="3Box Blog - By Don Stolz"
        />
      </Router>
    </BlogContext.Provider>
  );
};

export default App;
