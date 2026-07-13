import { Container, Typography, Stack, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useGetCartQuery } from "../api/cartApi";

import CartItem from "../components/CartItem";
import Loader from "../components/CircularProgress";
import EmptyState from "../components/EmptyState";

const Cart = () => {
  const { data, isLoading } = useGetCartQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const cartItems = data?.cartItems || [];

  if (!cartItems.length) {
    return <EmptyState title="Your Cart is Empty" />;
  }

  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          color: "#8B6F61",
          mb: 4,
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "3.5rem",
          },
        }}
      >
        My Cart
      </Typography>

      <Stack spacing={3}>
        {cartItems.map((item: any) => (
          <CartItem key={item._id} item={item} />
        ))}
      </Stack>

      <Box
        sx={{
          mt: 4,
          p: 3,

          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Typography
          sx={{
            color: "#8B6F61",
            fontWeight: 700,
            fontSize: {
              xs: 30,
              md: 36,
            },
          }}
        >
          Total: ₹{total}
        </Typography>

        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          fullWidth={
            {
              xs: true,
              sm: false,
            } as any
          }
          sx={{
            bgcolor: "#8B6F61",
            px: 5,
            py: 1.5,
            borderRadius: 10,
            minWidth: {
              sm: 220,
            },

            "&:hover": {
              bgcolor: "#73584d",
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
