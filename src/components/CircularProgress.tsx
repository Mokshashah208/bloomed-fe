import { Box, CircularProgress } from "@mui/material";

const Loader = ({ size = 40, minHeight = "300px" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      width="100%"
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;
