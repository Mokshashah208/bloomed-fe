import { Grid, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Grid
          key={item}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <Skeleton variant="rectangular" height={250} />

          <Skeleton />

          <Skeleton width="60%" />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSkeleton;
