import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Box, Paper, TextField, Stack, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Button } from '@mui/material'
import React from 'react'

interface State {
    username: string;
    password: string;
    showPassword: boolean;
}

function Login() {
    const [values, setValues] = React.useState<State>({
        username: '',
        password: '',
        showPassword: false
    });
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const loginPayload = {
        email: values.username,
        password: values.password
    }

    const handleClickLogin = () => {
        return null
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box sx={{ display: 'flex', '& > :not(style)': { m: 1, width: 500, height: 500 } }}>
            <Paper>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                    <Stack>
                        <TextField label="Username" id="username" size="small" value={values.username} onChange={handleChange('username')} />
                        <FormControl sx={{ m: 1, width: '25ch' }} >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                size="small"
                            />
                        </FormControl>
                        <Button variant="contained" color="success" onClick={handleClickLogin}>Login</Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login