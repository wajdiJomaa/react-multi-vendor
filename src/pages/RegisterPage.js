import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const RegisterPage = () => {

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" color="#00695c" sx={{ fontWeight: 'bold' }}>
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>First Name</Typography>
                                <TextField sx={{ mb: 0.5 }}
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    variant="outlined"
                                    autoFocus
                                    size='small'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Last Name</Typography>
                                <TextField sx={{ mb: 0.5 }}
                                    required
                                    fullWidth
                                    id="lastName"
                                    name="last_name"
                                    size='small'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Username</Typography>
                                <TextField sx={{ mb: 0.5 }}
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    size='small'

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Email Address</Typography>
                                <TextField sx={{ mb: 0.5 }}
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    autoComplete="email"

                                    size='small'

                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Phone Number</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    autoComplete="phone"
                                    size='small'

                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Address</Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    name="address"
                                    autoComplete="address"
                                    size='small'

                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Password</Typography>
                                <TextField sx={{ mb: 0.5 }}
                                    required
                                    fullWidth
                                    name="password"

                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    size='small'

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>Confirm Password</Typography>
                                <TextField 
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    type="password"
                                    id="confirm_password"
                                    autoComplete="new-password"
                                    size='small'
                                    
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3.5, mb: 2}}
                            style={{
                                backgroundColor: "#00695c",
                                fontWeight: "bold",
                                fontSize: 14
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {/* <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

let registerUser = async (e) => {
    e.preventDefault()
    const f_data = new FormData(e.currentTarget);
    let response = await fetch('http://127.0.0.1:8000/api/register_customer/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": {
                    "username": f_data.get('username'),
                    "email": f_data.get('email'),
                    "first_name": f_data.get('first_name'),
                    "last_name": f_data.get('last_name'),
                    "password": f_data.get('password')
                },
                "phone": f_data.get('phone'),
                "address": f_data.get('address')
            })
        })

    let data = await response.json()
    if (response.status === 201) {
        console.log("registered successfully")
    }
    else {
        console.log("failed")
    }
}

export default RegisterPage





