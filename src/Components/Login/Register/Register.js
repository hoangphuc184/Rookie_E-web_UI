import React, { useState } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../../Axios/authApi";
import { useHistory } from "react-router";
import logo from "../../../media/logo.png";
import useStyles from "./style";

const Register = ({ setIsLogin }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const classes = useStyles();
  const history = useHistory();
  if (localStorage.getItem("authenticated") === "true") {
    history.push("/");
  }

  const onSubmit = (data) => {
    handleRegister(data).then((response) => {
      console.log(response);
      if (response.errorCode === null) {
        setSuccess("Register successfully");
        setError("");
      } else if (response.errorCode === "USERNAME_NOT_AVAILABLE") {
        setError("Username is not available");
      } else if (response.errorCode === "EMAIL_NOT_AVAILABLE") {
        setError("Email is not available");
      }
    });
  };
  const handleRegister = async (data) => {
    const { email, username, password } = data;
    const response = await authApi.register({
      username: username,
      email: email,
      password: password,
    });
    return response;
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must follow this format: example@domain.com")
      .min(6, "Email must be at least 6 characters")
      .max(25, "Email must not exceed 25 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 characters"),
    confirmPassword: Yup.string()
      .required("Password must be reconfirmed")
      .oneOf([Yup.ref("password"), null]),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <img src={logo} />
      <Typography variant="h4" color="textSecondary">
        REGISTER
      </Typography>
      {error !== "" && <div className={classes.error}>*{error}</div>}
      {success !== "" && <div className={classes.success}>*{success}</div>}

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
        label="Email"
        id="email"
        name="email"
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
        size="small"
        {...register("email")}
        error={errors.email ? true : false}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.email?.message}
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

      <TextField
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
        size="small"
        {...register("confirmPassword")}
        error={errors.confirmPassword ? true : false}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.confirmPassword?.message}
      </Typography>

      <br />
      <br />

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        disableElevation
        onClick={handleSubmit(onSubmit)}
      >
        REGISTER
      </Button>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
        onClick={setIsLogin}
      >
        LOGIN
      </Button>
    </div>
  );
};

export default Register;
