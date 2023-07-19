import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../src/App.css";
import { NavLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Plantastic
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

// Paul's code
// import React from "react";
// import { useState } from "react";

// export default function Signup(){
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordHasErr, setPasswordHasErr] = useState(false);
//     const [emailHasErr, setEmailHasErr] = useState(false);
//     const [username, setUsername] = useState("");
//     const [usernameHasErr, setUsernameHasErr] = useState(false);
//     const [confrimPassword, setConfirmPassword] = useState("");

//     function handleEmailChange(e){
//         setEmail(e.target.value);
//     }

//     function handleEmailBlur(){
//         const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//         if(!regexEmail.test(email)){
//             setEmailHasErr(true);
//         } else {
//             setEmailHasErr(false);
//         }
//     }
//     function handlePasswordChange(e){
//         setPassword(e.target.value);
//     }

//     function handlePasswordBlur(){
//         const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
//         if(!regexPassword.test(password)){
//             setPasswordHasErr(true);
//         } else {
//             setPasswordHasErr(false);
//         }
//     }
//     function handleConfirmPasswordChange(e){
//         setConfirmPassword(e.target.value);
//     }
//     function handleConfirmPasswordBlur(){
//         const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
//         // password === confirmPassword
//         if(!regexPassword.test(confrimPassword) || password !== confrimPassword){
//             setPasswordHasErr(true);
//         }
//         else {
//             setPasswordHasErr(false);
//         }
//     }

//    function handleUsernameChange(e){
//         setUsername(e.target.value);
//     }
//     function handleUsernameBlur(){
//         const regexUsername = /^[a-zA-Z0-9]+$/;
//         if(!regexUsername.test(username)){
//             setUsernameHasErr(true);
//         } else {
//             setUsernameHasErr(false);
//         }
//     }

//     return( <div>
//        <h1>I am the Signup page.</h1>
//        <form>
//         <div>
//             <label for="email" className="form-label"
//             >Email:</label>
//             <input type="text" className="form-control" id="email" placeholder="email@example.com" value = {email}
//             onChange={handleEmailChange} onBlur=
//             {handleEmailBlur} />
//             {emailHasErr && <p className="text-danger">Please enter a valid email.</p>}
//         </div>

//         <div >
//             <label for="username"
//             className="form-label">
//                 Username:
//             </label>
//             <input type="text" className="form-control" id="username" placeholder="username" value = {username}
//             onChange={handleUsernameChange} onBlur=
//             {handleUsernameBlur}  />
//             {usernameHasErr && <p className="text-danger">Please enter a valid username.</p>}
//         </div>

//         <div>
//             <label for="password" className="form-label">
//                 Password:</label>
//             <input type="password" className="form-control" id="password" placeholder="password" value = {password}
//             onChange={handlePasswordChange} onBlur=
//             {handlePasswordBlur} />
//             <p>password must be 8 to 20 characters </p>
//             <p>
//                 password must contain at least one lowercase letter, one uppercase letter, and one number.
//             </p>
//             {passwordHasErr && <p className="text-danger">Please enter a valid password.</p>}
//         </div>
//         <div>
//             <label for="confirmPassword" className="form-label">
//                 Confirm Password:</label>
//             <input type="password" className="form-control" id="confirmPassword" placeholder="confirm password" value = {confrimPassword}
//             onChange={handleConfirmPasswordChange} onBlur=
//             {handleConfirmPasswordBlur} />
//             {passwordHasErr && <p className="text-danger">Your password does not match.</p>}
//         </div>
//         </form>

//         </div>
//         );
// }
