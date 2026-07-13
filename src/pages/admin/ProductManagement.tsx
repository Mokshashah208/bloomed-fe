import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../../api/productApi";
import Toaster from "../../components/common/Toaster";

const ProductManagement = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const isEditMode = !!id;

  const { data, isLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  const [addProduct, { isLoading: addLoading }] = useAddProductMutation();

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [errors, setErrors] = useState<any>({});

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    if (data?.product) {
      setForm({
        name: data.product.name || "",

        description: data.product.description || "",

        price: data.product.price || "",

        category: data.product.category || "",

        image: data.product.image || "",

        stock: data.product.stock || "",
      });
    }
  }, [data]);

  const validate = () => {
    const newErrors: any = {};

    if (!form.name) newErrors.name = "Required";

    if (!form.description) newErrors.description = "Required";

    if (!form.price) newErrors.price = "Required";

    if (!form.category) newErrors.category = "Required";

    if (!form.image) newErrors.image = "Required";

    if (!form.stock) newErrors.stock = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (isEditMode) {
        await updateProduct({
          id,
          body: form,
        }).unwrap();
        setToast({
          open: true,
          message: "Product Updated Successfully",
          severity: "success",
        });
      } else {
        await addProduct(form).unwrap();
        setToast({
          open: true,
          message: "Product Added Successfully",
          severity: "success",
        });
      }

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  if (isEditMode && isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 4,
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#8B6F61",
            mb: 4,
          }}
        >
          {isEditMode ? "Edit Product" : "Add Product"}
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Name"
            value={form.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={form.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <TextField
            label="Price"
            type="number"
            value={form.price}
            error={!!errors.price}
            helperText={errors.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <TextField
            label="Category"
            value={form.category}
            error={!!errors.category}
            helperText={errors.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <TextField
            label="Image URL"
            value={form.image}
            error={!!errors.image}
            helperText={errors.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

          <TextField
            label="Stock"
            type="number"
            value={form.stock}
            error={!!errors.stock}
            helperText={errors.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={addLoading || updateLoading}
          >
            {addLoading || updateLoading
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Add Product"}
          </Button>
        </Stack>
      </Paper>
      <Toaster
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
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

export default ProductManagement;
