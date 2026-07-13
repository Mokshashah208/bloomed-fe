import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

import SearchBar from "../components/SearchBar";

import { useGetProductsQuery } from "../api/productApi";
import ProductSkeleton from "../components/ProductSkeleton";
import EmptyState from "../components/EmptyState";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import { useAddToCartMutation } from "../api/cartApi";

import { useAddWishlistMutation } from "../api/wishlistApi";

import Toaster from "../components/common/Toaster";
const Products = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetProductsQuery({
    page,
    search,
    category: "",
  });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [addToCart] = useAddToCartMutation();

  const [addToWishlist] = useAddWishlistMutation();

  const productItems = useMemo(() => data?.products || [], [data]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!productItems.length) {
    return <EmptyState title="No data found" />;
  }
  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      }).unwrap();

      setToast({
        open: true,
        message: "Added To Cart 🛒",
        severity: "success",
      });
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Failed To Add Cart",
        severity: "error",
      });
    }
  };
  const handleWishlist = async (productId: string) => {
    try {
      await addToWishlist({ productId }).unwrap();

      setToast({
        open: true,
        message: "Added To Wishlist ❤️",
        severity: "success",
      });
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Failed To Add Wishlist",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          fontSize: "2.5rem",
          color: "#8B6F61",
          mb: 1,
        }}
      >
        Bloomed Collection
      </Typography>

      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <SearchBar search={search} setSearch={setSearch} />
      </Stack>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {data?.products?.map((product: any) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 2,
            }}
            key={product._id}
          >
            <Card
              onClick={() => navigate(`/products/${product._id}`)}
              sx={{
                width: "100%",
                maxWidth: 320,
                mx: "auto",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              <CardContent>
                <Typography
                  sx={{
                    fontWeight: 700,
                    height: 48,
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                  }}
                >
                  <b>{product.category}</b>
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#A08374",
                  }}
                >
                  ₹{product.price}
                </Typography>
                <Chip
                  label={`Stock ${product.stock}`}
                  size="small"
                  color={product.stock > 10 ? "success" : "warning"}
                  sx={{
                    mt: 1,
                  }}
                />
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "space-between",
                  px: 2,
                  pb: 2,
                }}
              >
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product._id);
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <Button
                  startIcon={<ShoppingCartOutlinedIcon />}
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                  }}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          page={page}
          count={data?.totalPages || 1}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
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
    </Container>
  );
};

export default Products;
