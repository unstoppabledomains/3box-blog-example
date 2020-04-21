import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/Write";

import { initThread } from "services/initBlog";
import getBlog from "services/Blog";

const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    getBlog();
  }, []);

  return (
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
      <Footer title="Unstoppable Blog" description="3Box Blog - By Don Stolz" />
    </Router>
  );
};

export default App;
