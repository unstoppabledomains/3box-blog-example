import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "styles/components/Header.styles";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";

interface Props {
  onLogout: () => void;
  profileImg: string;
  isAdmin: boolean;
}

const AvatarMenu: React.FunctionComponent<Props> = ({
  onLogout,
  profileImg,
  isAdmin,
}) => {
  const classes = useStyles();
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

  const handleLogout = async () => {
    setOpen(false);
    setAnchorEl(null);
    onLogout();
  };

  const handleProfile = () => {
    console.log("redirect to 3Box");
  };

  return (
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
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
