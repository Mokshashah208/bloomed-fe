import { Alert, Snackbar } from "@mui/material";

interface ToasterProps {
  open: boolean;
  message: string;
  severity?: any;
  onClose: () => void;
}

const Toaster = ({
  open,
  message,
  severity = "success",
  onClose,
}: ToasterProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          minWidth: 320,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
