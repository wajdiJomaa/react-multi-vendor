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
import { useForm, FormProvider } from "react-hook-form";
import Input from '../components/Input';
import MapComponent from './MapComponent';


const RegisterPage = () => {
    const methods = useForm();


    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
        

            <Container component="main" maxWidth={false} sx={{ display: 'flex', alignItems: 'center' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" color="#232F3E" sx={{ fontWeight: 'bold' }}>
                        Sign Up
                    </Typography>
                    <FormProvider {...methods}>
                        <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Input label="First Name" name="first_name"
                                        validate={{
                                            required: {
                                                value: true,
                                                message: 'Field Required',
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'Maximum 16 Charachters'
                                            }
                                        }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input label="Last Name" name="last_name" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Maximum 16 Charachters'
                                        }
                                    }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Username" name="username" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Maximum 16 Charachters'
                                        }
                                    }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Email Address" name="email" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Maximum 16 Charachters'
                                        }
                                    }} />

                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Phone Number" name="phone"
                                        validate={{
                                            required: {
                                                value: true,
                                                message: 'Field Required',
                                            },
                                            pattern: {
                                                value: /^(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}/i,
                                                message: 'Invalid Phone Number'
                                            }
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <Input label="Address" name="address" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'max length is 16'
                                        }
                                    }}>
                                        <div id="map"></div>

                                    </Input>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Input label="Password" name="password" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Maximum 16 Charachters'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Minimum 6 Charachters'
                                        }
                                    }} />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input label="Confirm Password" name="confirm_password" validate={{
                                        required: {
                                            value: true,
                                            message: 'Field Required',
                                        },
                                        validate: (value) => {
                                            if (methods.watch('password') != value) {
                                                return "No Match";
                                            }
                                        },

                                    }} />

                                </Grid>
                            </Grid>
                             <MapComponent /> 
                            
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
                                onClick={methods.handleSubmit(registerUser)}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item mb={2}>

                                    Already have an account?
                                    <Link color="#e47911" ml={1} href="/login" variant="body2">
                                        Log In
                                    </Link>

                                </Grid>
                            </Grid>
                        </Box>
                    </FormProvider>
                </Box>
            </Container >
        </ThemeProvider >
    );
}

let registerUser = async (data) => {
    let response = await fetch('http://127.0.0.1:8000/api/register_customer/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": {
                    "username": data.username,
                    "email": data.email,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "password": data.password
                },
                "phone": data.phone,
                "address": data.address
            })
        })

    let response_data = await response.json()
    if (response.status === 201) {
        console.log("registered successfully")
    }
    else {
        console.log("failed")
    }
}

export default RegisterPage


// function initMap() {
//     var lebanonCoordinates = { lat: 33.8547, lng: 35.8623 };  // Coordinates of Lebanon
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: lebanonCoordinates,
//         zoom: 8
//     });

//     var marker = new google.maps.Marker({
//        position: { lat: 33.8547, lng: 35.8623 },
//         map: map,
//         draggable: false
//     });
//     var initialLatitude = marker.getPosition().lat();
//     var initialLongitude = marker.getPosition().lng();

//     document.getElementById('id_latitude').value = initialLatitude;
//     document.getElementById('id_longitude').value = initialLongitude;
//     google.maps.event.addListener(map, 'click', function(event) {
//         var clickedLocation = event.latLng;
//         marker.setPosition(clickedLocation);
//         var latitude = event.latLng.lat();
//         var longitude = event.latLng.lng();

//         document.getElementById('id_latitude').value = latitude;
//         document.getElementById('id_longitude').value = longitude;
//     });
//     // Update the latitude and longitude fields when they are manually edited
//     document.getElementById('id_latitude').addEventListener('input', function(event) {
//     var latitude = parseFloat(event.target.value);
//     if (!isNaN(latitude)) {
//         var position = marker.getPosition();
//         position.lat(latitude);
//         marker.setPosition(position);
//     }
// });

//     document.getElementById('id_longitude').addEventListener('input', function(event) {
//     var longitude = parseFloat(event.target.value);
//     if (!isNaN(longitude)) {
//         var position = marker.getPosition();
//         position.lng(longitude);
//         marker.setPosition(position);
//     }
// });
// <script src="https://maps.googleapis.com/maps/api/js?key={{ GOOGLE_MAPS_API_KEY }}&callback=initMap" async defer></script>
// }


