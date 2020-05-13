import React from "react";
import appContext from "services/appContext";
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
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const { title, logo } = state;
  const {
    user: { loggedIn, walletAddress, profileImg },
    theme: { palette },
    adminWallet,
    socials,
  } = state;
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsAdmin(
      Boolean(
        walletAddress &&
          walletAddress.toLowerCase() === adminWallet.toLowerCase()
      )
    );
  }, [walletAddress, adminWallet]);

  const toHome = () => {
    handleRoute("");
  };

  const handleSocials = (id: string) => {
    console.log("id", id);
    const social = (socials as any)[id];
    const url = /^(http|https|ftp):/.test(social) ? social : `//${social}`;
    window.open(url, "_blank");
  };

  const handleBookmarks = () => {
    handleRoute("bookmarks");
  };

  const handleLogin = async () => {
    setLoading(true);
    await login({ state, dispatch })();
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout({ state, dispatch })();
    setLoading(false);
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
              isAdmin={isAdmin}
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
              isAdmin={isAdmin}
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
