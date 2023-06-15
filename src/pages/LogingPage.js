
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, FormProvider } from "react-hook-form";
import Input from '../components/Input';


const LogingPage = () => {
    let { loginUser } = useContext(AuthContext)
    const defaultTheme = createTheme()
    const methods = useForm();
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
                    }}>
                    <Typography component="h1" variant="h5" color="#232F3E" sx={{ fontWeight: 'bold' }}>
                        Sign In
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Input label="Email Address" name="email" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        }
                                    }} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Input label="Password" name="password" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                    }} />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3.5, mb: 2 }}
                                style={{
                                    backgroundColor: "#232F3E",
                                    fontWeight: "bold",
                                    fontSize: 14
                                }}
                                onClick={methods.handleSubmit(loginUser)}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item mb={2}>
                                    Don't have an account?
                                    <Link color="#e47911" ml={1} href="/register" variant="body2">
                                        Log In
                                    </Link>

                                </Grid>
                            </Grid>
                        </Box>
                    </FormProvider>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LogingPage