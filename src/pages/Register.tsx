import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { registerSchema } from "../validations/registerSchema";
import { useRegisterMutation } from "../api/authApi";
import Toaster from "../components/common/Toaster";

const Register = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await registerUser(payload).unwrap();

      setToast({
        open: true,
        message: res?.message || "Account created successfully 🎉",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Registration Failed",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg,#F8F5F2 0%,#EADFD8 100%)",
      }}
    >
      {/* Left Image */}
      <Box
        sx={{
          flex: 1,
          display: {
            xs: "none",
            md: "block",
          },
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200&q=80"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Right Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: {
            xs: 2,
            sm: 3,
            md: 5,
          },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 540,
            p: {
              xs: 3,
              sm: 4,
              md: 5,
            },

            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Playfair Display",
              fontWeight: 700,
              color: "#73584d",
              mb: 4,
              lineHeight: 1.1,
              fontSize: "2.6rem",
            }}
          >
            Create Account
          </Typography>

          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              gap: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 1,
                py: 1.7,
                borderRadius: 3,
                bgcolor: "#8B6F61",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "uppercase",

                "&:hover": {
                  bgcolor: "#73584d",
                },
              }}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: {
                  xs: 16,
                  md: 18,
                },
              }}
            >
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                sx={{
                  color: "#0B6B63",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Card>
      </Box>

      <Toaster
        open={toast.open}
        message={toast.message}
        severity={toast.severity as any}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
};

export default Register;
