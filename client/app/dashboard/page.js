'use client'
import Posts from "@/components/Posts";
import UserInfo from "@/components/UserInfo";
import { Box} from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Grid2";



const DashbaordPage = () => {


  return (
    <Box
      sx={{
        margin: "2em auto",
        width: "80%",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Grid2 sx={{height: '80vh'}} container>
        <Grid2 size={6} sx={{ borderRight: "1.5px solid #555", padding: "2em" }}>
          <UserInfo />
        </Grid2>
        <Grid2 size={6} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

            <Posts isPostsForUser={true} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DashbaordPage;
