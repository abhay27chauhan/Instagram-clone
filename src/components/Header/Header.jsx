import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { AppBar, IconButton, Toolbar, Typography, Badge, Avatar, Menu, MenuItem } from '@material-ui/core';
import { useStyles } from './styles';
import { Notifications } from '@material-ui/icons';
import { useStateValue } from '../../context/StateProvider';

function Header(props) {
    const classes = useStyles();
    const { state: { user }, signout } = useStateValue();
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

    return (
        <div className={classes.root}>
            <div className={classes.grow}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" noWrap>
                            Instagram
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <Notifications />
                                </Badge>
                            </IconButton>
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
