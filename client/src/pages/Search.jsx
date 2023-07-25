// make a mui search component that is a
import React, { useState } from "react";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import SearchResultDetail from "../components/SearchResultDetail";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleApi() {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchplant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: search }),
      });
      const plantData = await response.json();
      console.log({ plantData });
      setData(plantData.data);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack
      className="Search"
      direction="row"
      sx={{
        justifyContent: "center",
        padding: 4,
        height: "95%",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      <Box
        component="form"
        className="searchForm"
        sx={{
          width: "clamp(300px,60%,600px)",
          height: "clamp(300px,60%,600px)",
        }}
      >
        <FormControl sx={{ width: "100%" }} className="">
          {loading && (
            <div>
              <i className="fa-solid fa-seedling fa-bounce"></i>Loading...
            </div>
          )}
          {!loading && (
            <Stack direction="column" gap={2}>
              <TextField
                className="searchTextField"
                placeholder="Search Plants"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
                min="1"
              />
              <Button variant="contained" color="success" type="click" onClick={handleApi} onKeyDown={(e) => {return e.key === 13? handleApi:{}}}>
                Click to search
              </Button>
            </Stack>
          )}
        </FormControl>

        {/* show results */}

        <Stack direction={"column"} gap={3} py={3}>
          {data &&
            data.map((result) => (
              <SearchResultDetail
                key={result?.item?.id}
                imgLink={result?.item?.Img}
                title={result?.item?.["Latin name"]}
                data={result?.item}
              />
            ))}
        </Stack>
      </Box>
    </Stack>
  );
}
