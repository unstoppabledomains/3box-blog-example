import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import initBlog from "services/Blog";
// import { initThread } from "services/initBlog";

const App: React.FunctionComponent = () => {
  React.useEffect(() => {
    // initThread(process.env.REACT_APP_DOMAIN as string).then((res) => {
    //   console.log("return", res);
    // });
    initBlog();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/new">
          <Write />
        </Route>
        <Route path="/posts/:postId">
          <Read />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer title="Unstoppable Blog" description="3Box Blog - By Don Stolz" />
    </Router>
  );
};

export default App;
