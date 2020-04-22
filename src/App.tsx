import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import Context, { initialState } from "./services/appContext";
import appReducer from "services/appReducer";
import { initApp } from "services/userActions";
// import { initThread } from "services/initBlog";

const App: React.FunctionComponent = () => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    initApp({ state, dispatch })().then(() => setLoading(false));
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Header />
        {!loading && (
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
        )}
        <Footer
          title="Unstoppable Blog"
          description="3Box Blog - By Don Stolz"
        />
      </Router>
    </Context.Provider>
  );
};

export default App;
