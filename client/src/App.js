import React from "react";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
