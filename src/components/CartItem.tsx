import { Card, Typography, Stack, Box, IconButton } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

import { useRemoveFromCartMutation } from "../api/cartApi";

const CartItem = ({ item }: any) => {
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleDelete = async () => {
    await removeFromCart(item._id).unwrap();
  };

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,.06)",
      }}
    >
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "center",
            sm: "center",
          },
          gap: 3,
        }}
      >
        <Box
          component="img"
          src={item.product.image}
          alt={item.product.name}
          sx={{
            width: {
              xs: 120,
              sm: 110,
            },
            height: {
              xs: 120,
              sm: 110,
            },
            borderRadius: 3,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            flex: 1,
            width: "100%",
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
                xs: 22,
                md: 24,
              },
            }}
          >
            {item.product.name}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            {item.product.category}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 600,
            }}
          >
            Qty: {item.quantity}
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#8B6F61",
              fontWeight: 700,
              fontSize: {
                xs: 30,
                md: 34,
              },
            }}
          >
            ₹{item.product.price * item.quantity}
          </Typography>
        </Box>

        <IconButton
          color="error"
          onClick={handleDelete}
          sx={{
            alignSelf: {
              xs: "center",
              sm: "center",
            },
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

export default CartItem;
