import React from "react";
import appContext from "services/appContext";
// import { logout, loginTimeout as login } from "services/userActions";
import { login, logout } from "services/userActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "styles/components/Header.styles";
import { RoutingProps } from "types/app";
import Hidden from "@material-ui/core/Hidden";
import StandardHeader from "./StandardHeader";
import MobileHeader from "./MobileHeader";

const Header: React.FunctionComponent<RoutingProps> = ({ handleRoute }) => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(appContext);
  const { title, logo } = state;
  const {
    user: { loggedIn, walletAddress, profileImg, isAdmin, loading },
    theme: { palette },
    socials,
  } = state;

  const toHome = () => {
    handleRoute("");
  };

  const handleSocials = (id: string) => {
    const social = (socials as any)[id];
    const url = /^(http|https|ftp):/.test(social) ? social : `//${social}`;
    window.open(url, "_blank");
  };

  const handleBookmarks = () => {
    handleRoute("bookmarks");
  };

  const handleLogin = async () => {
    try {
      await login({ state, dispatch })();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ state, dispatch })();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPost = () => {
    handleRoute("write");
  };

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar className={classes.toolBar}>
          <Hidden smUp>
            <MobileHeader
              title={title}
              logo={logo}
              loggedIn={loggedIn}
              isAdmin={isAdmin || false}
              socials={socials}
              palette={palette}
              loading={loading}
              handleAddPost={handleAddPost}
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              handleBookmarks={handleBookmarks}
              handleSocials={handleSocials}
              toHome={toHome}
              handleRoute={handleRoute}
              walletAddress={walletAddress}
            />
          </Hidden>
          <Hidden xsDown>
            <StandardHeader
              title={title}
              logo={logo}
              loggedIn={loggedIn}
              isAdmin={isAdmin || false}
              socials={socials}
              palette={palette}
              loading={loading}
              profileImg={profileImg}
              handleAddPost={handleAddPost}
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              handleBookmarks={handleBookmarks}
              handleSocials={handleSocials}
              toHome={toHome}
              handleRoute={handleRoute}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
