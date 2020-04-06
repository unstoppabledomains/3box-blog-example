import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/post">
          <NewPost />
        </Route>
        <Route path="/blog/:blogId">Blog</Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer
        title="Unstoppable Blog"
        description="Orbit & 3Box Blog - By Don Stolz"
      />
    </Router>
  );
};

export default App;
