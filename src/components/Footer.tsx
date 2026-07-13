import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 2,
        borderTop: "1px solid #E8D8D1",
        bgcolor: "#F8F5F2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#8B6F61",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        BLOOMED • © 2026 All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
