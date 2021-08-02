import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import logo from "../../media/logo.png";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../Axios/authApi";
import { useHistory } from "react-router";
import Register from "./Register/Register";

const Login = ({ getAuthenticated }) => {
  const [error, setError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useHistory();

  if (localStorage.getItem("authenticated") === "true") {
    history.push("/");
  }

  const handleRegister = () => {
    setIsSignUp(true);
  };
  const setIsLogin = () => {
    setIsSignUp(false);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(16, "Username must not exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Input data: " + data.username + " " + data.password);
    login(data).then((response) => {
      console.log("res " + response);
      if (response.errorCode === null) {
        console.log(response);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("jwtToken", response.data.jwt);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("authenticated", true);
        getAuthenticated();
        history.push("/");
        console.log("History pushed");
      } else {
        console.log("Failed" + " " + response.errorCode);
        setError(true);
      }
    });
  };

  const login = async (data) => {
    const { username, password } = data;
    const response = await authApi.login({
      username: username,
      password: password,
    });

    return response.data;
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          bgcolor="white"
          boxShadow="2"
          textAlign="center"
          borderRadius="12px"
          p="24px"
          mt="50px"
        >
          {!isSignUp ? (
            <div>
              <img src={logo} />
              <Typography variant="h4" color="textSecondary">
                LOGIN
              </Typography>
              {error && <div>Wrong username or password</div>}
              <TextField
                label="Username"
                id="username"
                name="username"
                variant="outlined"
                color="secondary"
                fullWidth
                margin="normal"
                size="small"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
              <TextField
                label="Password"
                id="password"
                name="password"
                type="password"
                variant="outlined"
                color="secondary"
                fullWidth
                margin="normal"
                size="small"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                onClick={handleSubmit(onSubmit)}
              >
                LOGIN
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disableElevation
                onClick={handleRegister}
              >
                REGISTER
              </Button>
            </div>
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Login;
