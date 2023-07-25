import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Search from "./pages/Search.jsx";
import Header from "./components/Header";
import "./App.css";
import { Box } from "@mui/material";
import Login from "./pages/Login";
import MyGarden from "./pages/MyGarden";
import PlantDetails from "./pages/PlantDetails";
import useAuthService from "./utils/authHook";

function App() {
  const Auth = useAuthService();
  const loggedIn = Auth.loggedIn();
  return (
    <Box
      className="App debug-outline"
      display={"flex"}
      sx={{ height: "100vh", width: "100wh" }}
    >
      <Header />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/mygarden"
            element={loggedIn ? <MyGarden /> : <Navigate to="/signup" />}
          />
          <Route
            path="/plantdetails/:plantId"
            element={loggedIn ? <PlantDetails /> : <Navigate to="/signup" />}
          />
          <Route path="*" element={<>You are so lost now. Go home</>} />
        </Routes>
      </Box>
    </Box>
  );
}
export default App;
