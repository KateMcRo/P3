import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import homeImage from "./../images/PlantasticLogo.png";

export default function Home() {
  return (
    <Box
      className="Home"
      sx={{ display: "flex", placeContent: "center", direction: "row" }}
    >
      <Box className="imageLogo" sx={{ height: "500px" }}>
        <img
          src={homeImage}
          alt="Plantastic Logo"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <Stack direction="row" sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            className="login"
            variant="contained"
            component={NavLink}
            to="/Login"
            color="success"
          >
            Login
          </Button>
          <Button
            className="signUp"
            variant="contained"
            component={NavLink}
            to="/signup"
            color="success"
          >
            Sign Up
          </Button>
        </Stack>
      </Box>

      {/* two columns */}
      {/* <Box className="callToAction">
        <h2>some heading</h2>
        <p>some caption goes here</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
          tempore dicta ex odio quasi quia! Unde repellat eius dignissimos,
          dolore optio impedit inventore officiis, dicta, debitis itaque enim!
          Quam, obcaecati.
        </p>
       
      </Box> */}
    </Box>
  );
} //We updated a lot of the UI
