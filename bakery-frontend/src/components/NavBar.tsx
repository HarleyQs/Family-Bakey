import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../types/roles";

const pageLinks = [
  {
    path: "/",
    label: "Home",
    roles: [
      UserRole.ADMIN,
      UserRole.OWNER,
      UserRole.MANAGER,
      UserRole.STAFF,
      UserRole.CUSTOMER,
    ],
  },
  {
    path: "/recipes",
    label: "Recipes",
    roles: [
      UserRole.ADMIN,
      UserRole.OWNER,
      UserRole.MANAGER,
      UserRole.STAFF,
      UserRole.CUSTOMER,
    ],
  },
  {
    path: "/ingredients",
    label: "Ingredients",
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF],
  },
  {
    path: "/sales",
    label: "Sales",
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF],
  },
  {
    path: "/production",
    label: "Production",
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    path: "/stock",
    label: "Stock",
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF],
  },
];

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!user) return null;

  const availableLinks = pageLinks.filter((link) =>
    link.roles.includes(user.role),
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Family Bakery
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {availableLinks.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </Button>
          ))}
          <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {availableLinks.map((link) => (
              <MenuItem
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  handleMenuClose();
                }}
              >
                {link.label}
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => {
                logout();
                handleMenuClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
