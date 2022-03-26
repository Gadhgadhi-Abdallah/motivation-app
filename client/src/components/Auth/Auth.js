import React, { useState } from "react";
import { Container, Typography, Box, Grid, Link, TextField, Button, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { googleAuth, signIn, signUp } from "../../redux-store/authSlice";
import { useNavigate } from "react-router-dom";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await dispatch(signUp(formData));
      navigate("/");
    } else {
      await dispatch(signIn(formData));
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const swithMode = () => {
    setIsSignUp(!isSignUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
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
    <Container maxWidth="xs" sx={{ backgroundColor: "#FDFDF6", borderRadius: "10px", border: "1px solid #E7E6E1" }}>
      <Box
        sx={{
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
            //in production clientId = process.env.GOOGLE_Client_ID
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
