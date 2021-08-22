import React, { useState } from "react";
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

import { database } from '../../firebase/firebase.utils';

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
    markNotificationsRead(unreadNotificationsIds);
  };

  const markNotificationsRead = async (notIds) => {
    for(let i=0; i<notIds.length; i++){
      await database.notifications.doc(notIds[i]).update({
            read: true
      })
    }
  }

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
            <Typography variant="body1">
              {not.sender} {verb} your post
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
