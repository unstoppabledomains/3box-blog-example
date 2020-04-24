import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import appContext from "services/appContext";
import { login } from "services/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = React.useContext(appContext);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toPosts = () => {
    history.push("/new");
  };
  const toHome = () => {
    history.push("/");
  };
  const handleLogin = async () => {
    setLoading(true);
    await login({ state, dispatch })();
    setLoading(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={toHome} variant="h6" className={classes.title}>
            Blog
          </Typography>

          {loading ? (
            <CircularProgress color="secondary" />
          ) : state.user.loggedIn ? (
            <Button variant="contained" color="secondary" onClick={toPosts}>
              Add Post
            </Button>
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
