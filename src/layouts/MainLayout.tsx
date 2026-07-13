import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#F8F5F2",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: 1,
          width: "100%",
          px: {
            xs: 2,
            md: 4,
          },
          py: 3,
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
