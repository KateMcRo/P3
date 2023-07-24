import { useLazyQuery } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControl, IconButton, Paper, Stack, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";
import { QUERY_PLANT } from "../utils/queries";
import CenteredCircularProgress from "../components/CenteredCircularProgress";

/**
 *
 * @param {*} props
 * @returns
 */
function PlantDetails() {
  const params = useParams();
  const [query, { error, loading }] = useLazyQuery(QUERY_PLANT);
  const [plant, setPlant] = useState(undefined);

  const [notes, setNotes] = useState(undefined);

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes([...(notes ?? []), e.target.elements.note.value]);
    e.target.reset();
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }

    query({ variables: { id: params.id } }).then((res) => setPlant(res.data.plant));
  }, [params, query]);

  if (loading) {
    return <CenteredCircularProgress />;
  }

  if (error) {
    alert("Error loading plant details: " + error.message);
  }

  console.log({ plant });
  if (!plant?.commonName) {
    return <Typography variant="h1">No plant selected</Typography>;
  }

  return (
    <Stack direction="row" sx={{ placeContent: "center", padding: 5 }}>
      <Paper
        elevation={5}
        component={Stack}
        gap={3}
        sx={{ width: "clamp(300px,60%,800px)", borderRadius: "5px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <Box sx={{ height: "300px" }}>
          <ResponsiveImageContainer image={plant.img} />
        </Box>

        <Stack direction="column" p={2}>
          <Typography variant="h1" component="h5">
            {plant.commonName ?? "No name"}
          </Typography>

          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, rerum nam. Ipsam veniam asperiores cumque ullam? Dignissimos
            asperiores dolorum nisi!
          </span>

          <Box sx={{ justifySelf: "end", marginTop: "auto", display: "flex" }}>
            <Button variant="contained" sx={{ marginLeft: "auto" }}>
              Update
            </Button>
          </Box>
        </Stack>

        {/* text information */}

        <Box component="form" onSubmit={handleAddNote} p={2} sx={{ display: "flex", flexDirection: "column", gap: 2, gridColumn: "1/3" }}>
          <FormControl>
            <TextareaAutosize placeholder="Add personal note" name="note"></TextareaAutosize>
          </FormControl>
          <Box>
            <Button variant="contained" type="submit" sx={{ flex: "none", flexGrow: "none" }}>
              Add Note
            </Button>
          </Box>
        </Box>

        {/* list of personal notes, will be store if save button is clicked */}
        <Stack direction="column" p={2} gap={2}>
          {notes?.map((note) => (
            <Stack key={note} direction="row">
              <Typography sx={{ display: "grid", placeItems: "center" }}>{note}</Typography>
              <IconButton>
                <Delete />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default PlantDetails;