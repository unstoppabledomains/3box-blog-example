import React, { useEffect } from "react";
import Context from "services/appContext";
import appReducer from "services/appReducer";
import { initApp } from "services/blogActions";
import { initialState, AppPages, WALLET_TYPE } from "types/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "styles/App.styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import useAsyncEffect from "use-async-effect";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "pages/Home";
import Write from "pages/Write";
import Read from "pages/Read";
import Bookmarks from "pages/Bookmarks";
import Drafts from "pages/Drafts";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { defaultTheme } from "utils/createTheme";
import useQueryString from "utils/useQueryStringParams";
import WalletModal from "components/WalletModal";
import { login } from "services/userActions";

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { value: route, onSetValue: setRoute } = useQueryString("page", "");
  const { value: docId, onSetValue: setDocId } = useQueryString("id", "");

  useAsyncEffect(async () => {
    console.time("finish initApp()");
    await initApp({ state, dispatch })();
    console.timeLog("finish initApp()");
    setLoading(false);
  }, []);

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogin = async (wallet: WALLET_TYPE) => {
    try {
      toggleModalOpen();
      await login({ state, dispatch })(wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoute = (page: AppPages, docId?: string) => {
    setRoute(page);
    setDocId(docId || "");
    window.scroll({ top: 0 });
  };

  useEffect(() => {
    setTheme(state.theme);
  }, [state.theme]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Header handleRoute={handleRoute} handleLogin={toggleModalOpen} />
            <div className={classes.root}>
              {route === "read" ? (
                <Read id={docId as string} handleRoute={handleRoute} />
              ) : route === "write" ? (
                <Write
                  id={docId as string}
                  handleRoute={handleRoute}
                  handleLogin={toggleModalOpen}
                />
              ) : route === "bookmarks" ? (
                <Bookmarks handleRoute={handleRoute} />
              ) : route === "drafts" ? (
                <Drafts handleRoute={handleRoute} />
              ) : (
                <Home handleRoute={handleRoute} />
              )}
            </div>
            <Footer />
            {modalOpen && (
              <WalletModal
                open={modalOpen}
                onClose={toggleModalOpen}
                onSelectWallet={handleLogin}
              />
            )}
          </>
        )}
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
