"use client";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import CreatePostDialogForm from "./createPostDialogForm";
import { UserContext } from "@/app/Providers";

const Sidebar = () => {
  const { user, updateUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const logout = () => {
    
    localStorage.removeItem("user");
    updateUser(null);
  };



  return (
    <Box
      sx={{
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {user && (
          <>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "2em",
                padding: "8px 12px",
                borderRadius: "20px",
                textTransform: "none",
                borderColor: "gray",
                width: "100%",
                marginBottom: "1.5em",
                "&:hover": { borderColor: "black" },
              }}
            >
              <Avatar src="https://source.unsplash.com/50x50/?face" />

              <Typography variant="body1" sx={{ color: "black" }}>
                {user.email}
              </Typography>
            </Button>
            </Link>
            <Button sx={{ width: "100%" }} variant="contained" onClick={() => setOpen(pre => !pre)}>
              create post
            </Button>
          </>
        )}
      </Box>

      {user ? (
        <Button
          onClick={logout}
          sx={{ width: "100%" }}
          variant="contained"
          color="error"
        >
          log out
        </Button>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Link style={{ flex: 1 }} href="/sign-up">
            <Button sx={{ width: "100%" }} variant="contained">
              sign up
            </Button>
          </Link>
          <Link style={{ flex: 1 }} href="/log-in">
            <Button sx={{ width: "100%" }} variant="outlined">
              log in
            </Button>
          </Link>
        </Box>
      )}

      <CreatePostDialogForm open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Sidebar;
