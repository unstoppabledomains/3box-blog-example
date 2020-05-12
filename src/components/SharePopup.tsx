import React from "react";
import useStyles from "styles/components/SharePopup.styles";
import IconButton from "@material-ui/core/IconButton";
import CustomIcon from "./CustomIcon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  handleFacebook,
  handleTwitter,
  handleLinkedIn,
} from "utils/socialShare";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";

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
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      anchorEl={anchorRef.current}
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
    </Popover>
  );
};

export default SharePopup;
