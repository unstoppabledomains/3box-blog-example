import React from "react";
import useStyles from "styles/components/SharePopup.styles";
import IconButton from "@material-ui/core/IconButton";
import CustomIcon from "./CustomIcon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import {
  handleFacebook,
  handleTwitter,
  handleLinkedIn,
} from "utils/socialShare";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface Props {
  handleClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  open: boolean;
}

const SharePopup: React.FunctionComponent<Props> = ({
  handleClose,
  anchorRef,
  open,
}) => {
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "left top" : "left bottom",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper className={classes.root} id="social-popup">
              <Typography className={classes.shareText}>
                Share this post on
              </Typography>
              <IconButton className={classes.facebook} onClick={handleFacebook}>
                <CustomIcon type="facebook" color="#ffffff" />
              </IconButton>
              <IconButton className={classes.twitter} onClick={handleTwitter}>
                <CustomIcon type="twitter" color="#ffffff" />
              </IconButton>
              <IconButton className={classes.linkedIn} onClick={handleLinkedIn}>
                <CustomIcon type="linkedIn" color="#ffffff" />
              </IconButton>
            </Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
  );
};

export default SharePopup;
