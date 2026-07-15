import { Box, CircularProgress } from "@mui/material";

const Loader = ({ size = 40, minHeight = "300px" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: minHeight || "100vh",
        width: "100%",
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;
