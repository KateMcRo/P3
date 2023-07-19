import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import "./App.css";
import { Box } from "@mui/material";
import Login from "./pages/Login";

function App() {
  return (
    <Box className="App " display={"flex"} sx={{ height: "100%" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

export default App;
