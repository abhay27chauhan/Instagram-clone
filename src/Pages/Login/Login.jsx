import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Img1 from '../../Assets/img1.jpg'
import Img2 from '../../Assets/img2.jpg'
import Img3 from '../../Assets/img3.jpg'
import Img4 from '../../Assets/img4.jpg'
import Img5 from '../../Assets/img5.jpg'
import Insta from '../../Assets/insta.png'
import useStyles from './styles';
import CustomInput from '../../components/Input/Input';
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
        
        setLoading(true);
        const { email, password } = form;
        try{
            await login(email, password);
            setForm({email: '', password: ''})
            setLoading(false)
            props.history.push("/")
        }catch(err){
            console.error("login", err);
            alert("Error: wrong email or password. Try again!!");
            setForm({ email: "", password: "" });
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        let {name , value} = e.target;

        setForm({...form, [name]: value})
    }
    
    return (
        <Container className={classes.tc} component="main" maxWidth="md">
            <Grid container className={classes.gridContainer}>
                <Grid item md={6} className={classes.carContainer}>
                    <Paper elevation={3} >
                        <div className={classes.imgcar} style={{ backgroundImage: `url(` + Insta + `)`, backgroundSize: 'cover' }}>
                            <div className={classes.caro}>
                                <CarouselProvider
                                    visibleSlides={1}
                                    totalSlides={5}
                                    step={3}
                                    naturalSlideWidth={238}
                                    naturalSlideHeight={423}
                                    hasMasterSpinner
                                    isPlaying={true}
                                    infinite={true}
                                    dragEnabled={false}
                                    touchEnabled={false}
                                >
                                    <Slider>
                                        <Slide index={0}>
                                            <Image src={Img1} />
                                        </Slide>
                                        <Slide index={1}>
                                            <Image src={Img2} />
                                        </Slide>
                                        <Slide index={2}>
                                            <Image src={Img3} />
                                        </Slide>
                                        <Slide index={3}>
                                            <Image src={Img4} />
                                        </Slide>
                                        <Slide index={4}>
                                            <Image src={Img5} />
                                        </Slide>
                                    </Slider>
                                </CarouselProvider>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={5} className={classes.loginForm} >
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <CustomInput name="email" value={form.email} label="Email Address" handleChange={handleChange} type="email" autoFocus />
                                <CustomInput name="password" value={form.password} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
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
