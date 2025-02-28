'use client'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserContext } from "@/app/Providers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CreatePostDialogForm = ({ open, onClose }) => {

    const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
    const { user } = useContext(UserContext);
  
  

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => {
       
        const token = user?.token;
    
        if (!token) {
          throw new Error("You have to login");
        }
    
        return axios.post(`${API_URL}/posts`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    },
    onSuccess: () => {
      onClose(); // Close dialog after success
      setTitle("");
      setContent("");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.log("create post failed", error);
    },
  });

  const handleSubmit = () => {

    const postData = {
      title,
      content,
    };
    mutate(postData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Post</DialogTitle>
      <DialogContent>
        {isError && <p style={{ color: "red" }}>{error.message}</p>}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialogForm;
