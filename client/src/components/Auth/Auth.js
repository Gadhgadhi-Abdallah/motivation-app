import React, { useState } from "react";
import { Container, Typography, Box, Grid, Link, TextField, Button, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../redux-store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = () => {};

  const swithMode = () => {
    setIsSignUp(!isSignUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // ?. optional chaining operator to handel undefined obj
    const token = res?.tokenId;
    //because we work with async function we use try-catch
    try {
      dispatch(googleAuth({ result, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unsuccessfull ! try again !");
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: "#FBF8F1", borderRadius: "5px" }}>
      <Box
        sx={{
          marginTop: "5vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {isSignUp ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField autoComplete="given-name" name="firstName" required fullWidth label="First Name" onChange={handleChange} autoFocus />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Last Name" name="lastName" autoComplete="family-name" onChange={handleChange} />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12}>
              <TextField required fullWidth label="Email Address" name="email" autoComplete="email" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" autoComplete="new-password" onChange={handleChange} />
            </Grid>
            {isSignUp && (
              <Grid item xs={12}>
                <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" onChange={handleChange} />
              </Grid>
            )}
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ margin: "10px 0" }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="76142288089-16ho972njtap29khrnpccdeh8o7e3bqm.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                sx={{ marginBottom: "10px" }}
                onClick={renderProps.onClick}
                fullWidth
                variant="contained"
                color="primary"
                disabled={renderProps.disabled}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
            <Grid item>
              <Link href="#" variant="body2" onClick={swithMode}>
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
