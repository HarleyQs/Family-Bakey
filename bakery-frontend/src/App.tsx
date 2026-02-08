import React, { type JSX } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Box, CircularProgress } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Permission } from "./types/roles";
import SignIn from "./pages/SignIn";
import { RecipesList } from "./pages/recipes/RecipesList";
import { RecipeDetail } from "./pages/recipes/RecipeDetail";
import { IngredientsManager } from "./pages/recipes/IngredientsManager";

function AppContent() {
  const [msg, setMsg] = useState("...Loading");
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    axios.get("api/health").then((res) => setMsg(res.data));
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show sign-in page if not authenticated
  if (!isAuthenticated) {
    return <SignIn />;
  }

  // Show main app content when authenticated
  return (
    <Router>
      <Routes>
        <Route
          path="/recipes"
          element={
            <ProtectedRoute requiredPermission={Permission.READ_PRODUCTS}>
              <RecipesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/new"
          element={
            <ProtectedRoute requiredPermission={Permission.WRITE_PRODUCTS}>
              <RecipeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute requiredPermission={Permission.WRITE_PRODUCTS}>
              <RecipeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients"
          element={
            <ProtectedRoute requiredPermission={Permission.READ_PRODUCTS}>
              <IngredientsManager />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/recipes" replace />} />
      </Routes>
    </Router>
  );
}

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
