import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/stylesComp/login.css"
import HeaderLog from "./HeaderLog";
import logo from "../../img/logo.png"

const SignInForm = () => {

  //Les states 
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //****************************************** Les fonctions **************************************/
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:4200/api/auth/login`,
      withCredentials: true,
      data: {
        user_email: email,
        user_password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("user_info", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch((err) => {
        setErrors({
          ...errors,
          message: err.response.data.errorMessage,
        });
      });
  };

  
  return (
    <>
    <HeaderLog/>
    <div className="login">
      <div className="login-form">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <div className="error">{errors.message}</div>
          <br />
          <input type="submit" value="Se connecter" id="validation" />
            <a href="/signup" className="redirect" >
              Pas encore de compte ? Inscrivez-vous
            </a>
        </form>
      </div>
      <br />
      <div className="footer">
        <img src={logo} alt="" className="imgFooter"/>
      </div>
    </div>
  </>
  );
};
export default SignInForm;