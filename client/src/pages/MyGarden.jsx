import useAuthService from "../utils/authHook";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function MyGarden() {
  const navigate = useNavigate();
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  const username = user.data.username;
  const { data } = useQuery(QUERY_USER, {
    variables: { userId: user.data._id },
    fetchPolicy: "network-only",
  });

  function handleClick(id) {
    navigate(`/plantdetails/${id}`);
  }

  return (
    <div style={{ margin: "20px" }}>
      <div>
        <span style={{ fontSize: "32px", fontFamily: "var(--bodyFont)" }}>
          Hello,
        </span>
        <br />
        <span
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "var(--bodyFont)",
          }}
        >
          {username}!
        </span>
        <br />
        <br />
      </div>
      <Grid container spacing={2}>
        {data &&
          data.user.plants?.map((plant) => (
            <Grid item xs={12} sm={6} md={4} key={plant._id}>
              <img
                src={plant.img}
                alt={plant.commonName}
                onClick={() => {
                  handleClick(plant._id);
                }}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
