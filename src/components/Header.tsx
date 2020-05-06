import React from "react";
import { useHistory } from "react-router-dom";
import appContext from "services/appContext";
import { login, logout } from "services/userActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/components/Header.styles";
import AvatarMenu from "./AvatarMenu";
import Divider from "@material-ui/core/Divider";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import CreateIcon from "@material-ui/icons/Create";
import SocialLogo from "./SocialLogo";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import { Socials } from "types/app";
import CustomIcon from "./CustomIcon";

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = React.useContext(appContext);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const { title } = state;
  const {
    user: { loggedIn, walletAddress, profileImg },
    theme: { palette },
    adminWallet,
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
    history.push("/");
  };

  const handleSocials = ({ target }: any) => {
    const logo = target.id;
    console.log(logo);
  };

  const handleBookmarks = () => {
    history.push("/bookmarks");
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
    history.push("/new");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <div className={classes.leftContainer}>
            <Typography onClick={toHome} variant="h6" className={classes.title}>
              {title}
            </Typography>
            {loggedIn && (
              <>
                <Divider
                  className={classes.bookmarksDivider}
                  flexItem
                  orientation="vertical"
                />
                <Button
                  className={classes.bookmarksButton}
                  variant="text"
                  startIcon={
                    <CustomIcon
                      color={palette.primary.contrastText}
                      type="bookmarks"
                    />
                  }
                  onClick={handleBookmarks}
                >
                  Bookmarks
                </Button>
              </>
            )}
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.socialRow}>
              {Object.keys(state.socials).map((key: string) =>
                key !== "iconColor" ? (
                  <IconButton
                    key={key}
                    id={key}
                    onClick={handleSocials}
                    className={classes.socialIcon}
                  >
                    <SocialLogo
                      logo={key as Socials}
                      iconColor={state.socials.iconColor}
                    />
                  </IconButton>
                ) : null
              )}
            </div>
            {isAdmin && (
              <Button
                variant="contained"
                className={classes.headerButton}
                onClick={handleAddPost}
                startIcon={<CreateIcon />}
                color="secondary"
              >
                Add Post
              </Button>
            )}
            {loading ? (
              <CircularProgress color="secondary" />
            ) : loggedIn ? (
              <AvatarMenu
                onLogout={handleLogout}
                profileImg={profileImg as string}
                isAdmin={isAdmin}
              />
            ) : (
              <Button
                variant="contained"
                className={classes.headerButton}
                onClick={handleLogin}
                color="secondary"
                startIcon={<LockIcon />}
              >
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
