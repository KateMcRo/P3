import { Box, Button, Stack, Typography } from "@mui/material";
import useAuthService from "../utils/authHook";
import { useMutation } from "@apollo/client";
import { ADD_PLANT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

export default function SearchResultDetail({ imgLink, title, data }) {
  const Auth = useAuthService();
  const navigate = useNavigate();
  const [createPlant] = useMutation(ADD_PLANT, {
    onError: (e) => {
      /* TO DO: add error handling */
      console.error(e.message);
    },
    onCompleted: ({ plantData }) => {
      navigate("/mygarden");
    },
  });

  async function addPlant() {
    const token = Auth.getToken();
    const userData = await Auth.getProfile(token);
    const plantObj = {
      latinName: title,
      commonName: data?.["Common name"]?.[0] ?? "N/A",
      img: imgLink,
      idealLight: data?.["Light ideal"],
      watering: data?.Watering,
      username: userData.data.username,
    };
    createPlant({ variables: { ...plantObj } });
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gap: "1rem",
      }}
    >
      <Box className="plantImage">
        <img
          src={imgLink}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </Box>

      <Stack>
        <Typography variant="h2">{title}</Typography>
        <Button variant="contained" color="success" onClick={addPlant}>
          Add Plant
        </Button>
      </Stack>
    </Box>
  );
}
