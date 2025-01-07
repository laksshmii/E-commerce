import React from "react";
import { Button, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Shopping Mart</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "89vh",
          backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/25ae6e106148471.5f890a5067f12.jpg')",
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat",
        }}
      >
        <Link to="/products">
          <Button variant="contained" color="primary" size="large">
            Shop Now
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default HomePage;
