import {
  Container,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  TextField,
  Pagination,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../api/productApi";

import ProductSkeleton from "../../components/ProductSkeleton";
import Toaster from "../../components/common/Toaster";

const AdminProducts = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data, isLoading, refetch } = useGetProductsQuery({
    page,
    search,
    category: "",
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedId).unwrap();
      await refetch();
      setToast({
        open: true,
        message: "Product Deleted Successfully",
        severity: "success",
      });

      setOpen(false);
    } catch {
      setToast({
        open: true,
        message: "Failed To Delete Product",
        severity: "error",
      });
    }
  };

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 6,
      }}
    >
      <Box sx={{ mb: 4, pb: 2 }}>
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: "2.3rem",
            color: "#8B6F61",
            mb: 2,
          }}
        >
          Manage Products
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: 400,
            }}
          />

          <Button
            component={Link}
            to="/admin/products/add"
            variant="contained"
            sx={{
              bgcolor: "#8B6F61",
              px: 3,
              py: 1,
              borderRadius: 2,
            }}
          >
            Add Product
          </Button>
        </Stack>
      </Box>

      {!data?.products?.length ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
          }}
        >
          <Typography variant="h5">No Products Found</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {data.products.map((product: any) => (
            <Grid
              key={product._id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 2,
              }}
            >
              <Card
                sx={{
                  width: 220,
                  height: 320,
                  border: "1px solid #eee",
                  borderRadius: 1,
                  boxShadow: "none",
                  overflow: "hidden",
                  mx: "auto",

                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    width: "100%",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {product.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {product?.category}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#A08374",
                    }}
                  >
                    ₹{product?.price}
                  </Typography>

                  <Chip
                    label={`Stock ${product?.stock}`}
                    size="small"
                    color={product?.stock > 10 ? "success" : "warning"}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    component={Link}
                    to={`/admin/products/edit/${product?._id}`}
                  >
                    Edit
                  </Button>

                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setSelectedId(product._id);

                      setOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Pagination
          page={page}
          count={data?.totalPages || 1}
          onChange={(_, value) => setPage(value)}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleteing..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default AdminProducts;
