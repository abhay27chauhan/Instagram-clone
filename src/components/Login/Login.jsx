import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import CustomInput from './Input';
import { useStateValue } from '../../context/StateProvider';

const initialState = {email: '', password: ''};

function Login(props) {
    const classes = useStyles();
    const { login } = useStateValue()

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleSubmit = async (e) => {
        console.log("login");
        e.preventDefault();
        
        const { email, password } = form;
        setLoading(true);
        try{
            await login(email, password);
            setForm({email: '', password: ''})
            setLoading(false)
            props.history.push("/")
        }catch(err){
            console.error("login", err);
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        let {name , value} = e.target;

        setForm({...form, [name]: value})
    }
    
    return (
        <Container className={classes.tc} component="main" maxWidth="md">
            <Grid container justify="space-between">
                <Grid item md={6}>
                    <Paper elevation={3} ></Paper>
                </Grid>
                <Grid item md={5}>
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <CustomInput name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus />
                                <CustomInput name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            </Grid>
                            <Button disabled={loading} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                Log In
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button>
                                        <Link to="/signup">Don't have an account? Sign Up</Link>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
