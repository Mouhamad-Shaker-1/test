import { getSinglePost } from "@/utils/api";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const singlePostPage = async ({ params }) => {
  const postId = params.id;

  const post = await getSinglePost(postId)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "1em",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          minWidth: '600px'
        }}
      >
        {/* User Info */}
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar src="https://source.unsplash.com/50x50/?face" />{" "}
          {/* User avatar */}
          <Typography variant="subtitle1" fontWeight="bold">
          {post.createrName}
          </Typography>
        </Box>

        <Box>
          {/* Post Title */}
          <Typography variant="h6" fontWeight="bold">
          {post.title}

          </Typography>

          {/* Post Content */}
          <Typography variant="body2" color="text.secondary" mt={1}>
            {post.content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default singlePostPage;
