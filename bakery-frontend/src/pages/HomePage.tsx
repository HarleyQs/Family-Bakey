import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Family Bakery!
      </Typography>
      <Typography variant="body1">
        Manage recipes, ingredients, sales, and more from your personalized
        dashboard.
      </Typography>
    </Paper>
  </Box>
);

export default HomePage;
