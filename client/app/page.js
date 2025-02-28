import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: '1em'
      }}
    >
      <h2>Welcome to the social media site</h2>
      <div>
        <Link href="/posts">
          <Button variant="contained">see posts</Button>
        </Link>
      </div>
    </Box>
  );
}
