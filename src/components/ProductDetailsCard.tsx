import {
  Grid,
  Typography,
  Button,
  Card,
  Stack,
  Box,
  Chip,
  Divider,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useState } from "react";

import { useAddToCartMutation } from "../api/cartApi";
import { useAddWishlistMutation } from "../api/wishlistApi";

import Toaster from "./common/Toaster";

const ProductDetailsCard = ({ product }: any) => {
  const [addToCart] = useAddToCartMutation();
  const [addWishlist] = useAddWishlistMutation();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      setToast({
        open: true,
        message: "Added To Cart",
        severity: "success",
      });
    } catch {
      setToast({
        open: true,
        message: "Failed To Add Cart",
        severity: "error",
      });
    }
  };

  const handleWishlist = async () => {
    try {
      await addWishlist({
        productId: product._id,
      }).unwrap();

      setToast({
        open: true,
        message: "Added To Wishlist",
        severity: "success",
      });
    } catch {
      setToast({
        open: true,
        message: "Failed To Add Wishlist",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: 500,
                bgcolor: "#fafafa",
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={product?.image}
                alt={product?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontSize: 38,
                fontWeight: 700,
                mb: 2,
              }}
            >
              {product?.name}
            </Typography>

            <Typography
              sx={{
                color: "#8B6F61",
                fontSize: 42,
                fontWeight: 700,
                mb: 3,
              }}
            >
              ₹{product?.price}
            </Typography>

            <Stack
              sx={{
                flexDirection: "row",
                gap: 2,
                mb: 3,
              }}
            >
              <Chip
                label={product?.category}
                sx={{
                  bgcolor: "#F3EAE4",
                  color: "#8B6F61",
                }}
              />

              <Chip
                label={`Stock ${product?.stock}`}
                color={product?.stock > 10 ? "success" : "warning"}
              />
            </Stack>

            <Divider sx={{ mb: 2, mt: 1 }} />

            <Typography
              sx={{
                color: "#666",
                lineHeight: 2,
                fontSize: 16,
              }}
            >
              {product?.description}
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              sx={{ spacing: 2, mt: 5 }}
            >
              <Button
                variant="contained"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "#8B6F61",
                  px: 4,
                  py: 1.5,

                  "&:hover": {
                    bgcolor: "#73584d",
                  },
                }}
              >
                Add To Cart
              </Button>

              <Button
                variant="outlined"
                startIcon={<FavoriteBorderOutlinedIcon />}
                onClick={handleWishlist}
                sx={{
                  borderColor: "#8B6F61",
                  color: "#8B6F61",

                  "&:hover": {
                    borderColor: "#73584d",
                  },
                }}
              >
                Wishlist
              </Button>
            </Stack>
          </Grid>
        </Grid>
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

export default ProductDetailsCard;
