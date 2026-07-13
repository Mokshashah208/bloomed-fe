import { Container, Typography, Stack } from "@mui/material";

import { useGetWishlistQuery } from "../api/wishlistApi";

import WishlistItem from "../components/WishlistItem";
import Loader from "../components/CircularProgress";
import EmptyState from "../components/EmptyState";

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const wishlist = data?.wishlist || [];
  if (!wishlist.length) {
    return <EmptyState title="Wishlist Empty" />;
  }

  return (
    <Container maxWidth="lg">
      <Typography
        sx={{
          fontFamily: "Playfair Display",
          fontSize: "2.3rem",
          color: "#8B6F61",
          mb: 1,
        }}
      >
        My Wishlist
      </Typography>

      <Stack
        sx={{
          gap: 3,
          mt: 4,
          mb: 4,
        }}
      >
        {wishlist.map((item: any) => (
          <WishlistItem key={item._id} item={item} />
        ))}
      </Stack>
    </Container>
  );
};

export default Wishlist;
