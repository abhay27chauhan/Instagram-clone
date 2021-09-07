import React, { useState } from "react";
import {
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
    Typography,
    Badge,
} from "@material-ui/core";
import { Person, Close, Done, Delete } from "@material-ui/icons";
import GroupIcon from '@material-ui/icons/Group';
import { database } from '../../firebase/firebase.utils';

function FollowNotifications(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const notifications = props.notifications.filter(not => (not.recipient === props.user.userId && not.type !== "reject" && not.type !== "remove"));
    let groupIcon;

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const rejReq = async (not) => {
        await database.reqNotifications.add({
            sender: not.recipient,
            recipient: not.sender,
            createdAt: database.getUserTimeStamp(),
            type: "reject",
        })
        await database.reqNotifications.doc(not.notificationId).delete();
    }

    const accReq = async (not) => {
        await database.reqNotifications.add({
            sender: not.recipient,
            recipient: not.sender,
            createdAt: database.getUserTimeStamp(),
            type: "accept",
        });
        await database.users.doc(props.user.userId).update({
            followers: [...props.user.followers, not.sender]
        })
        await database.reqNotifications.doc(not.notificationId).delete();
    }

    const delNot = async (not) => {
        await database.reqNotifications.doc(not.notificationId).delete();
    }

    if (notifications && notifications.length > 0) {
        groupIcon = (
            <Badge
                badgeContent={
                    notifications.length
                }
                color="secondary"
            >
                <GroupIcon />
            </Badge>
        )
    } else {
        groupIcon = <GroupIcon />;
    }

    let notificationsMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map((not) => {
                const verb = not.type === "request" ? "requested to follow you" : "accepted your follow request";
                console.log("7 type ", not.type, verb);
                const iconColor = not.type !== "request" ? "primary" : "secondary";
                const icon =  <Person color={iconColor} style={{ marginRight: 10 }} />
                const rejIcon = not.type === "request" ? <Close style={{ marginRight: 10 }} onClick={() => rejReq(not)} /> : <Delete onClick={() => delNot(not)} />
                const accIcon = not.type === "request" ? <Done onClick={() => accReq(not)} /> : ""
                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography variant="body1" style={{ marginRight: 10 }}>
                            {not.sender} has {verb}
                        </Typography>
                        {rejIcon}
                        {accIcon}
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
                    {groupIcon}
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                {notificationsMarkup}
            </Menu>
        </div>
    );
}

export default FollowNotifications;
