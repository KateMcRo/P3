import { Box, Button, Stack } from "@mui/material";
import "./Home.css";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* two columns */}
      <Box className="imageLogo" sx={{ height: "500px" }}>
        <img
          src="https://img.freepik.com/premium-photo/still-life-home-interior-living-room-sunflowers-coffee-open-book-read-rest_176445-395.jpg"
          alt="flowers in a vase next to furniture"
        />
      </Box>
      <Box className="callToAction">
        <h2>some heading</h2>
        <caption>some caption goes here</caption>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
          tempore dicta ex odio quasi quia! Unde repellat eius dignissimos,
          dolore optio impedit inventore officiis, dicta, debitis itaque enim!
          Quam, obcaecati.
        </p>
        <Button variant="contained" component={NavLink} to="/signup" size='large'>Lets Begin</Button>
      </Box>
    </Box>
  );
}
