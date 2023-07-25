import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_PLANT, QUERY_USER } from "../utils/queries";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DELETE_PLANT } from "../utils/mutations";
import client from "../client.js";
import useAuthService from "../utils/authHook";

export default function PlantDetails() {
  const navigate = useNavigate("/mygarden");
  const { plantId } = useParams();
  const [singlePlantData, setSinglePlantData] = useState(null);
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  useQuery(QUERY_USER, {
    variables: { userId: user.data._id },
  });
  /* FOR JOHN AND MANNINDER REMOVE BEFORE DEPLOYMENT */
  const [useMockData] = useState(false); // if you want to use mockdata use true, if you want to use userdata use false
  const [getPlantData, { error, loading, data }] = useLazyQuery(QUERY_PLANT);
  const [deletePlantById] = useMutation(DELETE_PLANT, {
    onQueryUpdated: (updated) => {
      console.log({ updated });
    },
    onCompleted: () => {
      navigate("/mygarden");
    },
  });
  const fakePlantData = {
    _id: "1",
    latinName: "planty-mcPlantius",
    commonName: "Planty Mc Plant Face",
    img: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/55/Swoll_Groot_Infobox.jpg/revision/latest/scale-to-width-down/1200?cb=20230420151132",
    idealLight: "Yes",
    watering: "Please",
    username: "IamGroot",
    notification: false,
    plantNotes: [
      {
        _id: "",
        note: "",
        username: "",
        createdAt: "",
      },
    ],
  };
  /* FOR KATE: Performance - Remove before deployment and conditionally render based on useQuery hook*/
  useEffect(() => {
    getPlantData({ variables: { plantId: plantId } });
    if (data) {
      setSinglePlantData(data);
    }
  }, [data, getPlantData, plantId]);
  if (error) {
    console.warn(error);
  }
  console.log(singlePlantData);
  async function deletePlant() {
    deletePlantById({ variables: { id: plantId } });
  }
  return (
    <div>
      {/* All Material UI stuff will go inside this div */}
      {useMockData && <div>{fakePlantData.commonName}</div>}
      {!useMockData && (
        <div>
          {singlePlantData?.plant?.commonName}
          <Button variant="contained" color="success" onClick={deletePlant}>
            DELETE PLANT
          </Button>
        </div>
      )}
    </div>
  );
}
