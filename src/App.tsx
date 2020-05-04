import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import Context from "./services/appContext";
import appReducer from "services/appReducer";
import { initApp } from "services/blogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/App.styles";
import { initialState } from "types/app";
import useAsyncEffect from "use-async-effect";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { defaultTheme } from "utils/createTheme";
/* 
NOTE: Need to run this on first start up, needs to be created by admin

import createThread from "utils/createThread";

React.useEffect(() => {
	void createThread(config.domain).then((res) => {
		console.log(res);
	});
}, []);	
*/

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [loading, setLoading] = React.useState<boolean>(true);

  useAsyncEffect(async () => {
    await initApp({ state, dispatch })();
    setLoading(false);
  }, []);

  useEffect(() => {
    setTheme(state.theme);
  }, [state.theme]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
