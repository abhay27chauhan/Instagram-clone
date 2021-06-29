import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from '../Login/Input';

const initialState = {email: '', password: ''};

function Signup() {
    const classes = useStyles();

    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {
        let {name , value} = e.target;

        setForm({...form, [name]: value})
    }
    
    return (
        <Container className={classes.tc} component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Button>
                            <Link to="/login">Already have an account? Log in</Link>
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Signup;
