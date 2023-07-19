// import React, {useState} from "react";
// import { useHistory } from "react-router-dom";

import { FormGroup } from "@mui/material";
import { useState } from "react";
import { useNavigation } from "react-router-dom";

// import { User } from "../models/User";

// export default function Login(){
//    const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordHasErr, setPasswordHasErr] = useState(false);
//     const [usernameHasErr, setUsernameHasErr] = useState(false);
//     const history = useHistory();

//     function handleUsernameChange(e){
//         setUsername(e.target.value);
//     }

//    function handlePasswordChange(e){
//         setPassword(e.target.value);
//     }
//     // verify if user exists username and password matches the database
//     // function handleLogin(e){
//     //     e.preventDefault();
//     //     // if username and password are correct
//     //     // redirect to dashboard else display error message

//     // }
//     async function handleLogin(e){
//         e.preventDefault();
//         try{
//             const user = await User.findOne({username: username}, {password: password});
//             if(user){
//                 handleLoginSuccess();
//             } else {
//                 setUsernameHasErr(true);
//                 setPasswordHasErr(true);
//             }
//         } catch(err){
//             console.log(err);
//             throw err;
//         }
//     }
//      function handleUsernameBlur(){
//         const regexUsername = /^[a-zA-Z0-9]+$/;
//         if(!regexUsername.test(username)){
//             setUsernameHasErr(true);
//         } else {
//             setUsernameHasErr(false);
//         }
//     }

//     // if username and password are correct
//     function handleLoginSuccess(){
//         // confirm if user exists in the database
//         // if user exists redirect to dashboard
//         // else display error message
//         // if(username === User.username && password === User.password){
//         //     history.push("/dashboard");
//         // } else {
//         //     alert("Incorrect username or password");
//         // if(!usernameHasErr && !passwordHasErr){
//         //     // redirect to dashboard

//         // }
//         history.push("/dashboard");

//     }

//     return( <div>
//        <h1> I am the Login page.</h1>
//        <div>
//        <form onSubmit={handleLogin}>
//         <div>
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="text" className="form-control" id="username" placeholder="username" value={username} onChange={handleUsernameChange} onBlur=
//             {handleUsernameBlur}  />
//             {usernameHasErr && <p className="text-danger">Incorrect password or email</p>}
//         </div>
//          <div>
//             <label htmlFor="password" className="form-label">
//                 Password:</label>
//             <input type="password" className="form-control" id="password" placeholder="password" value = {password}
//             onChange={handlePasswordChange}  />
//             <p>Incorrect email or password </p>
//             <p>

//             </p>
//             {passwordHasErr && <p className="text-danger">Please enter a valid password.</p>}
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>

//        </form>
//        </div>
//         </div>
//         )
// }

// make a complete simple react login form component using material ui  , it should have fields for email and password and a submit button
// the email and password should be required

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHasErr, setEmailHasErr] = useState(false);
  const [passwordHasErr, setPasswordHasErr] = useState(false);
  //   const navigate = useNavigation();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailBlur() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regexEmail.test(email)) {
      setEmailHasErr(true);
    } else {
      setEmailHasErr(false);
    }
  }

  function handlePasswordBlur() {
    const regexPassword = /^[a-zA-Z0-9]+$/;
    if (!regexPassword.test(password)) {
      setPasswordHasErr(true);
    } else {
      setPasswordHasErr(false);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!emailHasErr && !passwordHasErr) {
      // redirect to dashboard
      //   navigate("/dashboard");
    }
  }

  return (
    <form>
      <h1>I am the Login page.</h1>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {emailHasErr && (
              <p className="text-danger">Please enter a valid email.</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            {passwordHasErr && (
              <p className="text-danger">Please enter a valid password.</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </form>
  );
}
