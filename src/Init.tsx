import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "styles/App.styles";
import useAsyncEffect from "use-async-effect";
import createThread from "utils/createThread";

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [config, setConfig] = React.useState({
    threadAddress: "",
    adminWallet: "",
    spaceName: "",
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  useAsyncEffect(async () => {
    const newConfig = await createThread("reseller-test-don1.crypto");
    setConfig(newConfig);
    setLoading(false);
  }, []);

  return (
    <div className={classes.initContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <p>adminWallet: {config.adminWallet}</p>
          <p>threadAddress: {config.threadAddress}</p>
          <p>spaceName: {config.spaceName}</p>
        </div>
      )}
    </div>
  );
};

export default App;
