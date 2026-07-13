import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1F5A3B",
    },
    secondary: {
      main: "#DCC8BD",
    },
    background: {
      default: "#F8F4F1",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontFamily: "Playfair Display",
    },
    h2: {
      fontFamily: "Playfair Display",
    },
  },

  shape: {
    borderRadius: 16,
  },
});
