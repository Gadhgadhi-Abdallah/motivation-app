import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { AppBar, Typography, Toolbar, Avatar, Button, Box } from "@mui/material";
import { styles } from "./styles";
import motivation from "./motivation-icon.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux-store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch(logOut());
    navigate("/");
    setUser(null);
  };

  return (
    <AppBar position="static" color="inherit" sx={styles.appbar}>
      <Box sx={styles.headingLogo}>
        <Link href="/" sx={{ textDecoration: "none" }}>
          <Typography variant="h4" sx={styles.heading}>
            Motivation
          </Typography>
        </Link>
        <img src={motivation} alt="" width="50" />
      </Box>
      <Toolbar>
        {user ? (
          <Box sx={styles.profile}>
            <Avatar sx={styles.avatar} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={styles.username} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" sx={styles.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button href="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
