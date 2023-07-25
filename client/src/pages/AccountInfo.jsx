import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
//import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import Copyright from "../components/Copyright";
import useAuthService from "../utils/authHook";
import { UPDATE_USER } from "../utils/mutations";




export default function AccountInfo() {
const [userFormData, setUserFormData] = useState({ email: "", password: "" });
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [updateUser, { error }] = useMutation(UPDATE_USER);
const Auth = useAuthService();

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
        ...userFormData,
        [name]: value,
    });
};
    
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    try {
        const response = await updateUser({
            variables: { ...userFormData },
        });
        const { token } = response.data.updateUser;
        Auth.login(token);
    } catch (err) {
        setShowAlert(true);
    }
    setUserFormData({
        email: "",
        password: "",
    });
};

return (
    <Stack
      direction="row"
      sx={{ height: "100%", width: "100%", placeContent: "center" }}
    >
      <Stack
        component="form"
        className="login-form"
        onSubmit={handleFormSubmit}
        sx={{ width: "100%", direction: "column", placeContent: "center" }}
      >
        <Stack
          direction="column"
          justifyContent={"center"}
          sx={{
            width: "clamp(300px,80%,400px)",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            margin: "auto",
          }}
        >
          {/* change Logo*/}
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {/* <LockIcon sx={{ alignSelf: "center" }} /> */}
          </Avatar>

          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="New Username"
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              required
              //onBlur={handleEmailBlur}
            />
            {/* {emailHasErr && (
              <p className="text-danger">Please enter a valid email.</p>
            )} */}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="New Email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              //   onBlur={handlePasswordBlur}
            />
            {/* {passwordHasErr && (
              <p className="text-danger">Please enter a valid password.</p>
            )} */}
          </FormControl>

          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            Update Profile
          </Button>

          {/* <Box sx={{ textAlign: "end", alignSelf: "end" }}>
            <NavLink to="/signup">Create an account. Sign up</NavLink>
          </Box> */}

          <Copyright sx={{ mt: 3 }} />
        </Stack>
      </Stack>
    </Stack>
  );
}