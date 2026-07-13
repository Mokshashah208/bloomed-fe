import {
  Container,
  Typography,
  Card,
  Box,
  Chip,
  Stack,
  Divider,
  Grid,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { useGetOrderByIdQuery } from "../api/orderApi";

import Loader from "../components/CircularProgress";
import EmptyState from "../components/EmptyState";

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const order = data?.order;

  if (!order) {
    return <EmptyState title="Order Not Found" />;
  }

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
            md: "3.8rem",
          },
        }}
      >
        Order Details
      </Typography>

      <Card
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#8B6F61",
              }}
            >
              Order ID
            </Typography>

            <Typography
              sx={{
                wordBreak: "break-all",
              }}
            >
              {order._id}
            </Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#8B6F61",
              }}
            >
              Total Amount
            </Typography>

            <Typography
              sx={{
                color: "#8B6F61",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              ₹{order.totalPrice}
            </Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#8B6F61",
                mb: 1,
              }}
            >
              Status
            </Typography>

            <Chip
              label={order.orderStatus}
              color={
                order.orderStatus === "Delivered"
                  ? "success"
                  : order.orderStatus === "Cancelled"
                    ? "error"
                    : "warning"
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: 22,
              md: 28,
            },
            mb: 3,
          }}
        >
          Ordered Products
        </Typography>

        <Stack spacing={2}>
          {order.orderItems?.map((item: any, index: number) => (
            <Card
              key={index}
              sx={{
                p: 2,
                border: "1px solid #eee",
                boxShadow: "none",
                borderRadius: 3,
              }}
            >
              <Stack
                sx={{
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 17,
                    }}
                  >
                    {item?.name || item?.product?.name || "Product"}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                    minWidth: {
                      sm: 100,
                    },
                    textAlign: {
                      xs: "left",
                      sm: "center",
                    },
                  }}
                >
                  Qty: <strong>{item.quantity}</strong>
                </Typography>

                <Typography
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                    minWidth: {
                      sm: 120,
                    },
                    textAlign: {
                      xs: "left",
                      sm: "right",
                    },
                    color: "#8B6F61",
                    fontWeight: 700,
                    fontSize: 20,
                  }}
                >
                  ₹{item.price}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Card>
    </Container>
  );
};

export default OrderDetails;
