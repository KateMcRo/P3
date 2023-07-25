import React, { useState, useEffect, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../src/App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import useAuthService from "../utils/authHook";

import { FormHelperText, Typography } from "@mui/material";
import Copyright from "../components/Copyright";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
    validatePassword: "",
  });
  const [hasError, setHasError] = useState({
    username: false,
    email: false,
    password: false,
    validatePassword: false,
  });
  const [disabled, setDisabled] = useState(true);
  const Auth = useAuthService();
  const [createUser, { loading }] = useMutation(ADD_USER, {
    onError: (e) => {
      /* TO DO: add error handling */
      console.error(e.message);
    },
    onCompleted: ({ userdata }) => {
      Auth.login(userdata.token);
      navigate("/");
    },
  });
  const isValidPassword = useCallback((password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{6,}$/;
    return passwordRegex.test(password);
  }, []);
  // Checks user email input against regex, returns boolean
  const isValidEmail = useCallback((email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, []);

  useEffect(() => {
    // Checks user password input against regex, returns boolean

    /* If password meets regex, and email meets regex, and pass === validate pass return true, else false  */
    const valid =
      signUpForm.username.length > 0 &&
      isValidPassword(signUpForm.password) &&
      signUpForm.password === signUpForm.validatePassword &&
      isValidEmail(signUpForm.email);
    /* sets state value to disable button */
    setDisabled(!valid);
  }, [isValidEmail, isValidPassword, signUpForm]);

  function handleChange(event) {
    return setSignUpForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit() {
    createUser({ variables: { ...signUpForm } });
  }

  function handleBlur(e) {
    const element = e.target.name;
    const value = e.target.value;
    switch (element) {
      case "username": {
        return setHasError((prev) => {
          return { ...prev, username: !signUpForm.username.length > 0 };
        });
      }
      case "email": {
        return setHasError((prev) => {
          return { ...prev, email: !isValidEmail(value) };
        });
      }
      case "password": {
        return setHasError((prev) => {
          return { ...prev, password: !isValidPassword(value) };
        });
      }
      case "validatePassword": {
        return setHasError((prev) => {
          return { ...prev, validatePassword: signUpForm.password !== value };
        });
      }
      default: {
        return setHasError((prev) => prev);
      }
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!loading && (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#e1c340" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleBlur}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => handleChange(e)}
                  />
                  {hasError.username && (
                    <FormHelperText error>
                      Username cannot be blank
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleBlur}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleChange(e)}
                  />
                  {hasError.email && (
                    <FormHelperText error>
                      {signUpForm.email} is not a valid email.
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleBlur}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleChange(e)}
                  />
                  {hasError.password && (
                    <FormHelperText error>
                      Must be at least 6 characters w/ uppercase, lowercase, &
                      special character.
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={handleBlur}
                    required
                    fullWidth
                    name="validatePassword"
                    label="Retype Password"
                    type="password"
                    id="validatePassword"
                    onChange={(e) => handleChange(e)}
                  />
                  {hasError.validatePassword && (
                    <FormHelperText error>
                      Passwords don't match.
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={disabled}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#013927" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {loading && (
          <div>
            <i className="fa-solid fa-seedling fa-bounce"></i>Loading...
          </div>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
