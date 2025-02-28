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


const EditeUserDialogForm = ({ open, onClose }) => {

const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const { user, updateUser } = useContext(UserContext);
  

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => {

        const token = user?.token;
    
        if (!token) {
          throw new Error("You have to login");
        }

        return axios.put(`${API_URL}/users`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    },
    onSuccess: (res) => {
      onClose(); // Close dialog after success
      setName("");
      setEmail("");
      updateUser({
        token: user.token,
        ...res.data
      })
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.log("create post failed", error);
    },
  });

  const handleSubmit = () => {

    const postData = {
      name,
      email,
    };
    mutate(postData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edite user</DialogTitle>
      <DialogContent>
        {isError && <p style={{ color: "red" }}>{error.message}</p>}
        <TextField
          fullWidth
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {isPending ? "edite..." : "edite"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditeUserDialogForm;
