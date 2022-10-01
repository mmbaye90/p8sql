import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profil/Profile";
import "./Styles/stylesPages/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
