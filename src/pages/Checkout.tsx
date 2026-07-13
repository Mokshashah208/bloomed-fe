import {
  Container,
  TextField,
  Typography,
  Stack,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetCartQuery } from "../api/cartApi";
import { useCreateOrderMutation } from "../api/orderApi";

import Toaster from "../components/common/Toaster";

const Checkout = () => {
  const navigate = useNavigate();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { data } = useGetCartQuery({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const cartItems = data?.cartItems || [];

  const totalPrice = cartItems.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0,
  );

  const fields = [
    {
      name: "fullName",
      label: "Full Name *",
    },
    {
      name: "phone",
      label: "Phone Number *",
    },
    {
      name: "address",
      label: "Address *",
      multiline: true,
      rows: 3,
    },
  ];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      setToast({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });

      return;
    }

    try {
      const orderItems = cartItems.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const result = await createOrder({
        ...form,
        orderItems,
        totalPrice,
      }).unwrap();

      setToast({
        open: true,
        message: "Order Placed Successfully 🌸",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/orders/${result.order._id}`);
      }, 1000);
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Failed to place order",
        severity: "error",
      });
    }
  };

  const renderField = (field: any) => (
    <TextField
      key={field.name}
      fullWidth
      label={field.label}
      multiline={field.multiline}
      rows={field.rows}
      value={form[field.name as keyof typeof form]}
      error={!!errors[field.name]}
      helperText={errors[field.name]}
      onChange={(e) => handleChange(field.name, e.target.value)}
    />
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        pl: 5,
        pr: 5,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          fontSize: {
            xs: "2.5rem",
            md: "3rem",
          },
          color: "#8B6F61",
          mb: 3,
        }}
      >
        Checkout
      </Typography>

      <Paper
        sx={{
          p: 4,
          boxShadow: "0 4px 15px rgba(0,0,0,.06)",
        }}
      >
        <Stack spacing={3}>
          {fields.map(renderField)}

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="City *"
              value={form.city}
              error={!!errors.city}
              helperText={errors.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />

            <TextField
              fullWidth
              label="State *"
              value={form.state}
              error={!!errors.state}
              helperText={errors.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </Stack>

          <TextField
            fullWidth
            label="Pincode *"
            value={form.pincode}
            error={!!errors.pincode}
            helperText={errors.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
          />

          <Box
            sx={{
              p: 3,
              bgcolor: "#F9F4F1",
              borderRadius: 3,
              border: "1px solid #eee",
            }}
          >
            <Typography
              sx={{
                color: "#8B6F61",
                fontWeight: 700,
                fontSize: "2rem",
              }}
            >
              Total: ₹{totalPrice}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              Secure checkout with Bloomed 🌸
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            disabled={isLoading}
            onClick={placeOrder}
            sx={{
              bgcolor: "#8B6F61",
              py: 1.7,
              fontSize: "1rem",

              "&:hover": {
                bgcolor: "#73584d",
              },
            }}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </Button>
        </Stack>
      </Paper>

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

export default Checkout;
