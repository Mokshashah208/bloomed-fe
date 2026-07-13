import { Box, Typography, Button } from "@mui/material";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  subtitle?: string;
}

const EmptyState = ({
  title = "No Data Found",
  subtitle = "Looks like there's nothing here yet.",
}: Props) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "#F3EAE4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <SentimentDissatisfiedOutlinedIcon
            sx={{
              fontSize: 50,
              color: "#8B6F61",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },
            color: "#8B6F61",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#666",
            fontSize: "1rem",
            mb: 4,
          }}
        >
          {subtitle}
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            bgcolor: "#8B6F61",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,

            "&:hover": {
              bgcolor: "#73584d",
            },
          }}
        >
          Browse Products
        </Button>
      </Box>
    </Box>
  );
};

export default EmptyState;
