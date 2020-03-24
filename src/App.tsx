import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost";

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
      <Footer title="Unstoppable Blog" description="3Box Blog - By Don Stolz" />
    </Router>
  );
};

export default App;
