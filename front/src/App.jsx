import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Home/Home";
// import Post from "./pages/Home/Post";
// import Profil from "./pages/Profil/Profil";
import Profile from "./pages/Profil/Profile";
// import Navbar from "./components/Navbar";
import "./Styles/stylesPages/app.css"

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      {/* <Route path="/post/:id" element={<Post/>}/> */}
      <Route path="/profil" element={<Profile/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
