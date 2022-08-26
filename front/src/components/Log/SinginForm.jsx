import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Styles/stylesComp/login.css"

const SignInForm = () => {

  //Les states 
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deactivatedUser, setDeactivatedUser] = useState(false);

  const navigate = useNavigate();

  //****************************************** Les fonctions **************************************/
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:4200/api/auth/login`,
      data: {
        user_email: email,
        user_password: password,
      },
      withCredentials: true,

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
        setDeactivatedUser(true);
      });
  };

  
  return (
    <div className="container-bloc-form">
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
          <NavLink to="/signup" className="login-form-end">
            Pas encore de compte ? Inscrivez-vous
          </NavLink>
        </form>
      </div>
      <br />
    </div>
  );
};
export default SignInForm;