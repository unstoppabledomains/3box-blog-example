import * as React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "styles/components/WalletModal.styles";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import { WALLET_TYPE } from "types/app";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: WALLET_TYPE) => void;
}

const WalletModal: React.FunctionComponent<Props> = ({
  open,
  onClose,
  onSelectWallet,
}) => {
  const classes = useStyles();
  const onSelectWeb3 = () => {
    onSelectWallet("web3");
  };
  const onSelectWalletConnect = () => {
    onSelectWallet("walletConnect");
  };

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Paper className={classes.paper}>
        <div className={classes.modalContent}>
          <div className={classes.modalHeader}>
            <Typography variant="h5" className={classes.modalTitle}>
              Select Wallet Access Provider
            </Typography>
            <IconButton className={classes.modalCloseIcon} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.providerColumn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.providerButton}
              startIcon={<Check />}
              onClick={onSelectWeb3}
            >
              Web3
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.providerButton}
              startIcon={<Check />}
              onClick={onSelectWalletConnect}
            >
              WalletConnect
            </Button>
          </div>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default WalletModal;
