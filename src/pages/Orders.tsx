import {
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Box,
  Chip,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useGetOrdersQuery } from "../api/orderApi";

import Loader from "../components/CircularProgress";
import EmptyState from "../components/EmptyState";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const orders = data?.orders || [];

  if (!orders.length) {
    return <EmptyState title="No Orders Yet" />;
  }

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          fontSize: {
            xs: "2.6rem",
            md: "3.5rem",
          },
          color: "#8B6F61",
          mb: 4,
        }}
      >
        My Orders
      </Typography>

      <Stack spacing={3}>
        {orders.map((order: any) => (
          <Card
            key={order._id}
            sx={{
              p: 3,
              boxShadow: "0 6px 18px rgba(0,0,0,.06)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2,1fr)",
                  md: "2fr 1fr 1fr auto auto",
                },
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#8B6F61",
                    fontSize: 14,
                  }}
                >
                  Order ID
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    wordBreak: "break-word",
                  }}
                >
                  #{order._id.slice(-8)}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#8B6F61",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Items
                </Typography>

                <Typography sx={{ fontSize: 18 }}>
                  {order.orderItems?.length || 1} Item(s)
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#8B6F61",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#8B6F61",
                  }}
                >
                  ₹{order.totalPrice}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "flex-start",
                    md: "center",
                  },
                }}
              >
                <Chip
                  label={order.orderStatus || "Pending"}
                  color={
                    order.orderStatus === "Delivered" ? "success" : "warning"
                  }
                />
              </Box>

              <Button
                component={Link}
                to={`/orders/${order._id}`}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#8B6F61",
                  textTransform: "none",
                  borderRadius: 3,
                  minHeight: 44,

                  "&:hover": {
                    bgcolor: "#73584d",
                  },
                }}
              >
                View Details
              </Button>
            </Box>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Orders;
