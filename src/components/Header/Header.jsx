import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Notifications from '../Notifications/Notifications'
import { useStyles } from './styles';
import { useStateValue } from '../../context/StateProvider';
import { database } from '../../firebase/firebase.utils';
import FollowNotifications from '../FollowNotifications/FollowNotifications';

function Header(props) {
    const [notData, setNotData] = useState([]);
    const classes = useStyles();
    const { state: { user, followReqNotifications }, signout } = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChange = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = async (e) => {
        let textValue = e.target.textContent;
        if(textValue === "Profile"){
            props.history.push(`/profile/${user.userId}`)
        }else if(textValue === "Logout"){
            try{
                await signout()
                props.history.push("/login");
            }catch(err){
                console.log("error ", err);
            }
        }
        setAnchorEl(null);
    }

    useEffect(() => {
        const unsub = database.notifications.onSnapshot(snapshot => {
            let arrOfNotObj = snapshot.docs.map(doc => {
                 return {notificationId: doc.id, ...doc.data()}
            })
            arrOfNotObj = arrOfNotObj.filter(not => not.recipient === user.userId);
            setNotData(arrOfNotObj);
         })

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.grow}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" noWrap>
                            Instagram
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Notifications notifications={notData} />
                            <FollowNotifications notifications={followReqNotifications} user={user} />
                            <Avatar aria-controls="simple-menu" aria-haspopup="true" className={classes.purple} alt={user.displayName} src={user.profileUrl} onClick={handleChange}>
                                {user.displayName.charAt(0)}
                            </Avatar>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} value="profile">Profile</MenuItem>
                                <MenuItem onClick={handleClose} value="logout">Logout</MenuItem>
                            </Menu>
                            <Typography className={classes.userName} variant="h6">      
                                {user.displayName}
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}

export default withRouter(Header);
