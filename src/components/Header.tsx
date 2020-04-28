import React from "react";
import { useHistory } from "react-router-dom";
import appContext from "services/appContext";
import { login, logout } from "services/userActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/components/Header.styles";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = React.useContext(appContext);
  const {
    user: { loggedIn, walletAddress, profileImg },
  } = state;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const toHome = () => {
    history.push("/");
  };

  const handleLogin = async () => {
    setLoading(true);
    await login({ state, dispatch })();
    setLoading(false);
  };
  const handleLogout = async () => {
    setLoading(true);
    await logout({ state, dispatch })();
    setAnchorEl(null);
    setOpen(false);
    setLoading(false);
  };

  const handleProfile = () => {
    console.log("redirect to 3Box");
  };
  const handlePost = () => {
    history.push("/new");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography onClick={toHome} variant="h6" className={classes.title}>
            Title
          </Typography>

          {loading ? (
            <CircularProgress color="secondary" />
          ) : loggedIn ? (
            <div>
              <Button
                ref={anchorRef}
                onClick={handleOpen}
                aria-controls="profile-menu"
                aria-haspopup="true"
                className={classes.avatarButton}
              >
                <Avatar src={profileImg} />
              </Button>
              <Menu
                id="profile-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                {walletAddress &&
                  walletAddress.toLowerCase() ===
                    process.env.REACT_APP_ADMIN_WALLET?.toLowerCase() && (
                    <MenuItem onClick={handlePost}>Add Post</MenuItem>
                  )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
