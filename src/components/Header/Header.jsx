import React from 'react'
import { AppBar, IconButton, Toolbar, Typography, Badge, Avatar } from '@material-ui/core';
import { useStyles } from './styles';
import { Notifications } from '@material-ui/icons';
import { useStateValue } from '../../context/StateProvider';

function Header() {
    const classes = useStyles();
    const { state: { user }} = useStateValue();

    return (
        <div>
            <div className={classes.grow}>
                <AppBar position="static">
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
                            <Avatar className={classes.purple} alt={user.displayName} src={user.profileUrl}>
                                {user.displayName.charAt(0)}
                            </Avatar>
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

export default Header;
