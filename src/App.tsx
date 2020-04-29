import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import Context from "./services/appContext";
import appReducer from "services/appReducer";
import { initBox } from "services/blogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/App.styles";
import { initialState } from "types/app";
/* 
NOTE: Need to run this on first start up, needs to be created by admin

import createThread from "utils/createThread";
import config from "config/blogConfig.json";

React.useEffect(() => {
	void createThread(config.domain).then((res) => {
		console.log(res);
	});
}, []);	
*/

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    void initBox({ state, dispatch })().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Header />
        <div className={classes.root}>
          {loading && (
            <div className={classes.loadingContainer}>
              <CircularProgress />
            </div>
          )}
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
        </div>
        <Footer
          title="Unstoppable Blog"
          description="3Box Blog - By Don Stolz"
        />
      </Router>
    </Context.Provider>
  );
};

export default App;
