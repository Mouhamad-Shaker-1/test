"use client";
import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/app/Providers";
import axios from "axios";
import toast from "react-hot-toast";
import EditePostDialogForm from "./EditePostDialogForm";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Post = ({ post, isPostsForUser }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const truncateString = (str, maxLength = 200) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  // Mutation for deleting a post
  const { mutate, isPaused } = useMutation({
    mutationFn: () =>
      axios.delete(`${API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post deleted successfully!", { id: "delete" });
    },
    onError: (err) => {
      toast.error("Failed to delete post!", { id: "delete" });
      console.error(err);
    },
  });

  const deletePostButton = (e) => {
    e.preventDefault();
    mutate();
  };

  const editePostButton = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Link href={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            maxWidth: 600,
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            flexShrink: 0,
          }}
        >
          {/* User Info */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src="https://source.unsplash.com/50x50/?face" />
              {/* User avatar */}
              <Typography variant="subtitle1" fontWeight="bold">
                {post.createrName}
              </Typography>
            </Box>
            {isPostsForUser && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => editePostButton(e)}
                >
                  edite
                </Button>
                <Button
                  onClick={(e) => deletePostButton(e)}
                  color="error"
                  variant="contained"
                  size="small"
                  disabled={isPaused}
                >
                  {isPaused ? "deleteing..." : "delete"}
                </Button>
              </Box>
            )}
          </Box>

          <CardContent>
            {/* Post Title */}
            <Typography variant="h6" fontWeight="bold">
              {post.title}
            </Typography>

            {/* Post Content */}
            <Typography variant="body2" color="text.secondary" mt={1}>
              {truncateString(post.content)}
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <EditePostDialogForm
        open={open}
        onClose={() => setOpen(false)}
        postId={post._id}
      />
    </>
  );
};

export default Post;
