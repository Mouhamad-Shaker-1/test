'use client'
import { UserContext } from "@/app/Providers";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const FormSignup = () => {

    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
      const { updateUser } = useContext(UserContext);

    const router = useRouter()

    const { mutate, isPending , isError, error } = useMutation({
        mutationFn: (userData) => {
            return axios.post(`${API_URL}/users`, userData, { withCredentials: true })
        },
        onSuccess: (res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
          updateUser(res.data)
          router.push("/posts")
        },
        onError: (error) => {
          console.log("Login failed", error);
        }
      });

    const handleSubmit =  (e) => {
        e.preventDefault();
        const userData = {
            name,
          email,
          password,
        };
        mutate(userData); 
      };



  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        {isError && <p style={{textAlign: 'center', color: 'red'}}>{error.message}</p>}
      <TextField
        label="Name"
        type="text"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="primary"
        disabled={isPending}
        sx={{ marginTop: 2 }}
      >
        {isPending ? 'signing' : 'sigup'}
      </Button>

      <Box sx={{ textAlign: "center", marginTop: "1em" }}>
        <Link href="/log-in" variant="body2">
          already have an account? Log In
        </Link>
      </Box>
    </form>
  );
};

export default FormSignup;
