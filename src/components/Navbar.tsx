import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Stack,
  IconButton,
  Drawer,
  Box,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGetCartQuery } from "../api/cartApi";
import { useLogoutMutation } from "../api/authApi";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data } = useGetCartQuery({});

  const cartCount = data?.cartItems?.length || 0;

  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();

      localStorage.clear();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      label: "Products",
      path: "/products",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
    },
    {
      label: "Orders",
      path: "/orders",
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#F8F5F2",
          borderBottom: "1px solid #E8D8D1",
        }}
      >
        <Toolbar
          sx={{
            py: 1,
            px: {
              xs: 2,
              md: 6,
            },
          }}
        >
          <Typography
            component={Link}
            to="/products"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "#8B6F61",
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              fontWeight: 700,
              fontFamily: "Playfair Display, serif",
              letterSpacing: 2,
            }}
          >
            BLOOMED
          </Typography>

          {/* Desktop Menu */}
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: "#6E5A50",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              component={Link}
              to="/cart"
              sx={{
                color: "#6E5A50",
                fontWeight: 700,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartOutlinedIcon
                  sx={{
                    color: "#6E5A50",
                  }}
                />
              </Badge>
            </Button>

            <Button
              onClick={handleLogout}
              sx={{
                color: "#6E5A50",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Logout
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "#8B6F61",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            bgcolor: "#F8F5F2",
            p: 3,
          }}
        >
          <Typography
            sx={{
              color: "#8B6F61",
              fontSize: "2rem",
              fontFamily: "Playfair Display",
              fontWeight: 700,
              mb: 2,
            }}
          >
            BLOOMED
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  color: "#6E5A50",
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              component={Link}
              to="/cart"
              onClick={() => setMobileOpen(false)}
              sx={{
                justifyContent: "flex-start",
                color: "#6E5A50",
                fontWeight: 600,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>

              <Box sx={{ ml: 2 }}>Cart</Box>
            </Button>

            <Divider sx={{ my: 1 }} />

            <Button
              onClick={handleLogout}
              sx={{
                justifyContent: "flex-start",
                color: "#d32f2f",
                fontWeight: 600,
              }}
            >
              Logout
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
