import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useState } from "react";

import { useRemoveWishlistMutation } from "../api/wishlistApi";
import { useAddToCartMutation } from "../api/cartApi";

import Toaster from "./common/Toaster";

const WishlistItem = ({ item }: any) => {
  const [removeWishlist] = useRemoveWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const moveToCart = async () => {
    try {
      await addToCart({
        productId: item.product._id,
        quantity: 1,
      }).unwrap();

      await removeWishlist(item._id).unwrap();

      setToast({
        open: true,
        message: "Moved To Cart 🛒",
        severity: "success",
      });
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Failed to move item",
        severity: "error",
      });
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      await removeWishlist(item._id).unwrap();

      setToast({
        open: true,
        message: "Removed From Wishlist ❤️",
        severity: "success",
      });
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Failed to remove item",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "0 8px 25px rgba(0,0,0,.06)",
          transition: ".3s",

          "&:hover": {
            boxShadow: "0 12px 30px rgba(0,0,0,.08)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={item.product.image}
              alt={item.product.name}
              sx={{
                width: {
                  xs: 150,
                  sm: 120,
                },
                height: {
                  xs: 150,
                  sm: 120,
                },
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <Box
              sx={{
                flex: 1,
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: 24,
                    sm: 22,
                  },
                }}
              >
                {item.product.name}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                {item.product.category}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                color: "#8B6F61",
                fontSize: {
                  xs: 34,
                  sm: 30,
                },
              }}
            >
              ₹{item.product.price}
            </Typography>

            <Stack
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 2,
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={moveToCart}
                sx={{
                  bgcolor: "#8B6F61",
                  borderRadius: 3,
                  textTransform: "none",
                  px: 3,

                  "&:hover": {
                    bgcolor: "#73584d",
                  },
                }}
              >
                Move To Cart
              </Button>

              <Button
                fullWidth
                color="error"
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                onClick={handleRemoveWishlist}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Toaster
        open={toast.open}
        message={toast.message}
        severity={toast.severity as any}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </>
  );
};

export default WishlistItem;
