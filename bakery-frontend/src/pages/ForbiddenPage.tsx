import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ForbiddenPageProps {
  requiredPermission?: string;
}

export const ForbiddenPage: React.FC<ForbiddenPageProps> = ({
  requiredPermission,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="orange"
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: "4rem", fontWeight: "bold", mb: 2 }}
      >
        403
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Access Forbidden
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", maxWidth: "500px" }}
      >
        {requiredPermission
          ? `You don't have permission to access this page. Required permission: ${requiredPermission}`
          : "You don't have permission to access this page."}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ForbiddenPage;
