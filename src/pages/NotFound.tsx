import { Box, Typography, Button, Container } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 120,
            color: "#8B6F61",
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: "5rem",
              md: "8rem",
            },
            fontWeight: 700,
            color: "#8B6F61",
            lineHeight: 1,
            fontFamily: "Playfair Display",
          }}
        >
          404
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "1.8rem",
              md: "2.5rem",
            },
            fontWeight: 600,
            mb: 2,
          }}
        >
          Oops! Page Not Found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 500,
          }}
        >
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{
            bgcolor: "#8B6F61",
            px: 4,
            py: 1.5,

            "&:hover": {
              bgcolor: "#73584d",
            },
          }}
        >
          Back To Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
