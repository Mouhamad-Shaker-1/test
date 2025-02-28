"use client";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import Post from "./Post";
import { getAllPost } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/app/Providers";

const Posts = ({ isPostsForUser = false}) => {
   const { user } = useContext(UserContext);

  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["posts", isPostsForUser, user?._id],
    queryFn: () => getAllPost(isPostsForUser ? user?._id : null),
  });



  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        padding: "2em",
      }}
    >
      {posts?.length !== 0 ? (
        posts?.map((post) => <Post isPostsForUser={isPostsForUser} key={post._id} post={post} />)
      ) : (
        <h1> there are no posts to show</h1>
      )}
    </Box>
  );
};

export default Posts;
