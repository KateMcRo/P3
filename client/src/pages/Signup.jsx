import { useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../src/App.css";
import { Copyright } from "../components/Copyright";
import Auth from "../utils/authHook";
import { ADD_USER } from "../utils/mutations";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SignUp() {
  const [userFormData, setUserFormData] = useState({ username: "username", email: "", password: "", confirmPassword: "" });
  const [usernameHasErr, setUsernameHasErr] = useState(false);
  const [passwordHasErr, setPasswordHasErr] = useState(false);
  const [emailHasErr, setEmailHasErr] = useState(false);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const response = await addUser({
        variables: { ...userFormData },
      });
      const { token } = response.data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    setUserFormData({
      email: "",
      password: "",
      username: "",
    });
  };
  function handleEmailBlur() {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const emailInvalid = !regexEmail.test(userFormData.email);
    console.log({ emailInvalid, email: userFormData.email });
    setEmailHasErr(emailInvalid);
  }

  function handlePasswordBlur() {
    const checks = [
      {
        label: "min-length-10",
        test(text) {
          return text.length >= 10;
        },
      },
      {
        label: "has-number",
        test(text) {
          return /\d/.test(text);
        },
      },
      {
        label: "has-upper",
        test(text) {
          return /[A-Z]/.test(text);
        },
      },
      {
        label: "has-lower",
        test(text) {
          return /[a-z]/.test(text);
        },
      },
    ];
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    // const passwordInvalid = !regexPassword.test(userFormData.password);
    const passwordInvalidArr = checks.map(({ label, test }) => ({ label, test: test(userFormData.password) }));
    console.log(passwordInvalidArr);

    const passwordInvalid = passwordInvalidArr.some(({ test }) => !test);
    console.log({ passwordInvalid, password: userFormData.password });
    setPasswordHasErr(passwordInvalid);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                  value={userFormData.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onBlur={handleEmailBlur}
                  {...(emailHasErr && { error: true, helperText: "Please enter a valid email" })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userFormData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handlePasswordBlur}
                  {...(passwordHasErr && {
                    error: true,
                    helperText:
                      "Password must be 6-10 characters and contain at least one number, one uppercase letter, and one lowercase letter",
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={userFormData.password}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              disabled={!(userFormData.email && userFormData.password && !emailHasErr && !passwordHasErr)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "darkgreen" }}
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

// class ParentComponent extends React.Component {
//   state = {
//     validEmail: false,
//     email: '',
//   };

//   onChange = (e) => {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   validateEmail = (e) => {
//     const email = e.target.value;
//     if (!email || invalidEmail(email)) {
//       this.setState({
//         validEmail: true,
//       });
//     } else {
//       this.setState({
//         validEmail: false,
//       });
//     }
//   }

//   render () {
//     const { validEmail, email } = this.state;

//     return (
//       <ChildComponent
//         email={email}
//         validEmail={validEmail}
//         onChange={this.onChange}
//         validateEmail={this.validateEmail}
//       />
//     );
//   }
// }

// const ChildComponent = (props) => (
//   <TextField
//     margin="dense"
//     id="emailAddress"
//     name="email"
//     label="email"
//     type="email"
//     onChange={props.onChange}
//     onBlur={props.validateEmail}
//     value={props.email}
//     error={props.validEmail}
//     helperText={props.validEmail ? 'Please enter a valid Email' : ' '}
//     fullWidth
//   />
// );
