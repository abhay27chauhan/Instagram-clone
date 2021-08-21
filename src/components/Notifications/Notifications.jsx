import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = props.notifications;
  let notificationsIcon;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };

  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <Favorite color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <Chat color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography component={Link} color="default" variant="body1">
              {not.sender} {verb} your scream
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <div>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onEntered={onMenuOpened}>
        {notificationsMarkup}
      </Menu>
    </div>
  );
}

export default Notifications;
