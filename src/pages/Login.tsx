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

import { loginSchema } from "../validations/loginSchema";
import { useLoginMutation } from "../api/authApi";
import Toaster from "../components/common/Toaster";

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginMutation();

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
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      setToast({
        open: true,
        message: res?.message || "Login Successful 🎉",
        severity: "success",
      });

      const redirectPath =
        res.user.role === "admin" ? "/admin/products" : "/products";

      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    } catch (error: any) {
      setToast({
        open: true,
        message: error?.data?.message || "Invalid Credentials",
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </Box>

      {/* Login Form */}
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
            maxWidth: 520,
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
              color: "#8B6F61",
              lineHeight: 1.1,
              mb: 4,
              fontSize: "2.8rem",
            }}
          >
            Welcome Back
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                py: 1.7,
                borderRadius: 3,
                bgcolor: "#8B6F61",
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                mt: 1,

                "&:hover": {
                  bgcolor: "#73584d",
                },
              }}
            >
              {isLoading ? "Logging In..." : "Login"}
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
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                underline="none"
                sx={{
                  fontWeight: 600,
                  color: "#0B6B63",
                }}
              >
                Register
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

export default Login;
