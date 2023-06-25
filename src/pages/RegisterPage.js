import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../components/Input";
import MapComponent from "./MapComponent";

const RegisterPage = () => {
  const methods = useForm();
  const defaultTheme = createTheme();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const registerUser = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add_vendor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
          vendor_name: data.username,
          mobile_number: data.phone,
          address: data.address,
          latitude: latitude, // Use the latitude state variable here
          longitude: longitude, // Use the longitude state variable here
        }),
      });
      {
        console.log(response.json);
      }

      if (response.ok) {
        console.log("Registration successful");
        // Handle successful registration, e.g., show success message, redirect user, etc.
      } else {
        console.error("Registration failed");
        // Handle registration failure, e.g., show error message, etc.
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure, e.g., show error message, etc.
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth={false}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="#232F3E"
            sx={{ fontWeight: "bold" }}
          >
            Sign Up
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              onSubmit={methods.handleSubmit(registerUser)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Input
                    label="Username"
                    name="username"
                    validate={{
                      required: {
                        value: true,
                        message: "Field Required",
                      },
                      maxLength: {
                        value: 16,
                        message: "Maximum 16 Characters",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    label="Email Address"
                    name="email"
                    validate={{
                      required: {
                        value: true,
                        message: "Field Required",
                      },
                      maxLength: {
                        value: 30,
                        message: "Maximum 30 Characters",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    label="Phone Number"
                    name="phone"
                    validate={{
                      required: {
                        value: true,
                        message: "Field Required",
                      },
                      // pattern: {
                      //   value: /^(?:\+961|961)?(1|0?3[0-9]{2}|0?7\d{1}|8\d{1}|9\d{1})(?:[.-]?[0-9]{2}){2}$/,
                      //   message: 'Invalid Phone Number',
                      // },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    validate={{
                      required: {
                        value: true,
                        message: "Field Required",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum 8 Characters",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    label="Address"
                    name="address"
                    multiline
                    rows={4}
                    validate={{
                      required: {
                        value: true,
                        message: "Field Required",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    color="#232F3E"
                    sx={{ fontWeight: "bold" }}
                  >
                    Set Location
                  </Typography>
                  <MapComponent
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" sx={{ color: "#232F3E" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
