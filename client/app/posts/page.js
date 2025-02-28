'use client'
import Posts from "@/components/Posts";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Grid2 from "@mui/material/Grid2";

const PostsPage = () => {



  return (
    <>
      <Grid2 sx={{height: '100vh'}} container>
        <Grid2 size={3.5}>
          <Sidebar />
        </Grid2>
        <Grid2 size={5.5} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Posts />
        </Grid2>
        <Grid2 sx={{backgroundColor: 'black'}} size={3}>


        </Grid2>
      </Grid2>
    </>
  );
};

export default PostsPage;
