import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import history from '../lib/history';
import DisplayMessage from '../lib/message';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '20px 20px 20px 20px',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    paper: {
        padding: theme.spacing(10),
        margin: 'auto',
        maxWidth: 500,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

function Login() {
    const classes = useStyles();
    const isMounted = React.useRef(null);
    const [login, setlogin] = React.useState(null);
    const [msg, setMsg] = React.useState(null);
    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        setMsg(null);
    };

    function handleClick(e) {
        e.preventDefault();
        isMounted.current = true;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: values.username, password: values.password })
        };
        fetch('/api/login', requestOptions)
            .then(async response => {
                if (response.ok) {
                    setlogin(true);
                    setMsg({ severity: 'success', summary: 'Success: ', detail: 'Login is sucessful!' })
                } else {
                    setlogin(false);
                    setMsg({ severity: 'error', detail: 'Username/Password is incorrect!', closable: true })
                }
            })
    }

    return (
        <div className={classes.root}>
            {login  && history.push('/home') }            
            <Paper className={classes.paper}>
                <Grid container spacing={5}>
                {msg && <DisplayMessage message={msg} />}
                    <form className={classes.root} noValidate autoComplete="on">
                        <div>
                            <Typography variant="h4" component="h4" style={{ margin: 'auto' }}>
                                Imperva
                            </Typography>
                            <TextField
                                id="outlined-full-width"
                                label="Username"
                                style={{ margin: 5 }}
                                placeholder=""
                                value={values.username}
                                onChange={handleChange('username')}
                                helperText=""
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined" />
                            <TextField
                                id="outlined-full-width"
                                label="Password"
                                type='password'
                                autoComplete="current-password"
                                style={{ margin: 5 }}
                                placeholder=""
                                value={values.password}
                                onChange={handleChange('password')}
                                helperText=""
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined" />
                            <Button variant="contained" color="primary" type="submit" style={{ margin: 5 }} onClick={handleClick}>Log In</Button>
                        </div>
                    </form>
                </Grid>
            </Paper>
        </div>
    )
}

export default Login;