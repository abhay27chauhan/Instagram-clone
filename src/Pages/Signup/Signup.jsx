import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, Input } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BackupIcon from '@material-ui/icons/Backup';

import useStyles from './styles';
import CustomInput from '../../components/Input/Input';
import { useStateValue } from '../../context/StateProvider';
import { database, storage } from '../../firebase/firebase.utils';
import { ACTIONS } from '../../context/reducer';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

function Signup(props) {
    const classes = useStyles();
    const { signup, dispatch, setLoading } = useStateValue();

    const [form, setForm] = useState(initialState);
    const [file, setFile] = useState('');
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleFileChange = (e) => {
        let file = e?.target?.files[0];
        if(file != null){
            console.log("file ", file)
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        const { firstName, lastName, email, password, confirmPassword } = form;
        const displayName = `${firstName} ${lastName}`

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try{
            let user = await signup(email, password);
            let uid = user.uid;
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);

            // fn1 -> progress
            // fn2 -> error 
            // fn3-> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }
            function fn2(error) {
                console.log(error)
            }
            async function fn3() {
                // link get 
                let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL();

                let userObj = {
                    email: email,
                    userId: uid,
                    displayName,
                    createdAt: database.getUserTimeStamp(),
                    profileUrl: downloadurl,
                    postIds: []
                }
                await database.users.doc(uid).set(userObj)

                dispatch({type: ACTIONS.SET_USER, user: userObj})
                setLoading(false);

                setForm(initialState);
                setLoader(false);
                props.history.push("/")
            }
        }catch(err){
            console.log("signup", err)
            setLoader(false);
        }
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
                        <CustomInput name="firstName" value={form.firstName} label="First Name" handleChange={handleChange} autoFocus half />
                        <CustomInput name="lastName" value={form.lastName} label="Last Name" handleChange={handleChange} half />
                        <CustomInput name="email" value={form.email} label="Email Address" handleChange={handleChange} type="email" />
                        <CustomInput name="password" value={form.password} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <CustomInput name="confirmPassword" value={form.confirmPassword} label="Repeat Password" handleChange={handleChange} type="password" /> 
                    </Grid>
                    <label htmlFor="contained-button-file">
                        <Input className={classes.input} accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                        <Button startIcon={<BackupIcon />} color="secondary" fullWidth variant="outlined" component="span" className={classes.file}>
                            Upload
                        </Button>
                    </label>
                    <Button disabled={loader} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
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
