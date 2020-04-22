import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import Context, { initialState } from "./services/appContext";
import appReducer, { ADD_BOX } from "services/appReducer";
import * as config from "config/blogConfig.json";
import { initApp } from "services/userActions";
// import { initThread } from "services/initBlog";

const App: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  React.useEffect(() => {
    initApp({ state, dispatch })();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
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
        <Footer
          title="Unstoppable Blog"
          description="3Box Blog - By Don Stolz"
        />
      </Router>
    </Context.Provider>
  );
};

export default App;
