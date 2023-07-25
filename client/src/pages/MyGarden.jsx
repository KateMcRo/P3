import { useEffect, useState } from "react";
import useAuthService from "../utils/authHook";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import client from "../client";
import { Grid, FormRow, ListItem } from "@mui/material";

export default function MyGarden() {
  /* FOR JOHN AND MANNINDER REMOVE BEFORE DEPLOYMENT */
  const [useMockData] = useState(false); // if you want to use mockdata use true, if you want to use userdata use false
  const navigate = useNavigate();
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  const username = user.data.username;
  const { data } = useQuery(QUERY_USER, {
    variables: { userId: user.data._id },
    fetchPolicy: "network-only",
  });

  /* FOR KATE: Performance - Remove before deployment and conditionally render based on useQuery hook*/
  /* This watches for changes in data, and user.data._id and sets setPlantData state */

  const mockUser = {
    username: "IamGroot",
  };
  const mockPlantData = [
    {
      id: "1",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "2",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: "3",
      img: "https://m.media-amazon.com/images/I/816bMUrw6DL._AC_UF894,1000_QL80_.jpg",
    },
  ];

  function handleClick(id) {
    navigate(`/plantdetails/${id}`);
  }

  return (
    <Grid container spacing={2}>
      {useMockData &&
        mockPlantData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <img
              src={item.img}
              alt=""
              onClick={() => {
                handleClick(item.id);
              }}
            />
          </Grid>
        ))}
      {!useMockData &&
        data &&
        data.user.plants?.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant._id}>
            <img
              src={plant.img}
              alt=""
              onClick={() => {
                handleClick(plant._id);
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
}
