import React from "react";
import appContext from "services/appContext";
import { login, logout } from "services/userActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/components/Header.styles";
import AvatarMenu from "components/AvatarMenu";
import Divider from "@material-ui/core/Divider";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import CustomIcon from "components/CustomIcon";
import { useHistory } from "react-router-dom";

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
    history.push("/");
  };

  const handleSocials = ({ target }: any) => {
    const key = target.id;
    const url = (socials as any)[key];
    window.open(url, "_blank");
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
    history.push("/write");
  };

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar className={classes.toolBar}>
          <div className={classes.leftContainer}>
            <Typography onClick={toHome} className={classes.title}>
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
              {socials.hasFacebook && (
                <IconButton
                  id="facebook"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="facebook"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
              )}
              {socials.hasInstagram && (
                <IconButton
                  id="instagram"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="instagram"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
              )}
              {socials.hasTwitter && (
                <IconButton
                  id="twitter"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="twitter"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
              )}
              {socials.hasTelegram && (
                <IconButton
                  id="telegram"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="telegram"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
              )}
              {socials.hasLinkedIn && (
                <IconButton
                  id="linkedIn"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="linkedIn"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
              )}
              {socials.hasMedium && (
                <IconButton
                  id="medium"
                  className={classes.socialIcon}
                  onClick={handleSocials}
                >
                  <CustomIcon
                    type="medium"
                    color={palette.primary.contrastText}
                  />
                </IconButton>
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
    </>
  );
};

export default Header;
