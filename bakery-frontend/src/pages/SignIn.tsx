import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./SignIn.css";

interface SignInFormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/signin", formData);

      if (response.data.token && response.data.user) {
        // Call login from AuthContext
        login(response.data.token, {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role,
        });
        setSuccess(true);
      }
      console.log("Sign in successful:", response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Sign in failed. Please try again.",
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ padding: "unset !important" }}>
      <Box className="signin-container">
        <Paper elevation={3} className="signin-paper">
          <Box className="signin-header">
            <Typography variant="h4" component="h1" className="signin-title">
              Family Bakery
            </Typography>
            <Typography variant="subtitle1" className="signin-subtitle">
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="signin-alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="signin-alert">
              Sign in successful! Redirecting...
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="signin-form">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              margin="normal"
              required
              placeholder="Enter your email"
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              margin="normal"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || !formData.email || !formData.password}
              className="signin-button"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Box className="signin-footer">
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <a href="/signup" className="signin-link">
                Sign up
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <a href="/forgot-password" className="signin-link">
                Forgot password?
              </a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
