import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Styles/stylesComp/login.css"

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const errorRegister = document.querySelector(".errinscription");
        axios({
          method: "post",
          url: "http://localhost:3000/api/users/login",
          data: {
            email,
            password,
          },
    
        })
        .then((res) => {
            localStorage.setItem("userInfo",JSON.stringify(res.data))
            navigate("/home")
        })
        .catch((err) => {
          console.log(err.response.data.message);
          errorRegister.innerHTML = err.response.data.message;
        });
      };
    
      return (
        <div className="login">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
          <h1>Connexion</h1>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <input type="submit" value="Se connecter" id="validation" />
          <br />
          <div className="errinscription"></div>
          <NavLink to="/signup" className="gotoSignup">
            Vous êtes nouveau? inscrivez-vous
         </NavLink>

        </form>
        </div>
      );
    };

export default SignInForm;