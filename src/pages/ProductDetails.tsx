import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetProductByIdQuery } from "../api/productApi";

import ProductDetailsCard from "../components/ProductDetailsCard";
import Loader from "../components/CircularProgress";
import EmptyState from "../components/EmptyState";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const product = data?.product;

  if (!product) {
    return <EmptyState title="Product Not Found" />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 6,
      }}
    >
      <ProductDetailsCard product={product} />
    </Container>
  );
};

export default ProductDetails;
