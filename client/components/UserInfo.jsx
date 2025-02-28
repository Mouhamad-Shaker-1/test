"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import EditeUserDialogForm from "./EditeUserDialogForm";
import { UserContext } from "@/app/Providers";
import CreatePostDialogForm from "./CreatePostDialogForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const UserInfo = () => {
  const [openEditeDialogForm, setOpenEditeDialogForm] = React.useState(false);
  const [openCreatePostDialogForm, setOpenCreatePostDialogForm] =
    React.useState(false);
  const { user, updateUser } = useContext(UserContext);
  const queryClient = useQueryClient();


  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const token = user?.token;

      if (!token) {
        throw new Error("You have to login");
      }

      return axios.delete(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      localStorage.removeItem("user");
      updateUser(null);
      queryClient.invalidateQueries(["posts"]);
      router.push('/posts')
    },
    onError: (error) => {
      toast.error("there are something wrong");
      console.log("create post failed", error);
    },
  });

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h6">
          Name: <strong>{user?.name}</strong>
        </Typography>
        <Typography variant="h6">
          Email: <strong>{user?.email}</strong>
        </Typography>
      </Stack>
      <Box
        sx={{
          marginTop: "2em",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1em",
        }}
      >
        <Button onClick={mutate} variant="contained" color="error">
          {isPending ? "delete..." : "delete user"}
        </Button>
        <Button
          onClick={() => setOpenEditeDialogForm((prev) => !prev)}
          variant="contained"
        >
          Edite user
        </Button>
        <Button
          onClick={() => setOpenCreatePostDialogForm((prev) => !prev)}
          variant="contained"
        >
          create post
        </Button>
      </Box>

      <EditeUserDialogForm
        open={openEditeDialogForm}
        onClose={() => setOpenEditeDialogForm(false)}
      />
      <CreatePostDialogForm
        open={openCreatePostDialogForm}
        onClose={() => setOpenCreatePostDialogForm(false)}
      />
    </>
  );
};

export default UserInfo;
