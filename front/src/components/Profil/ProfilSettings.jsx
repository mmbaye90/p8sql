import axios from "axios";
import React, { useState } from "react";
import "../../Styles/stylesComp/changementPw.css";

const ProfilSettings = () => {
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLetterOk, setIsLetterOk] = useState(false);
  const [isNumberOk, setIsNumberOk] = useState(false);
  const [isSpecialOk, setIsSpecialOk] = useState(false);
  const [isMinMaxOk, setIsMinMaxOk] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  //************************************* LES REGEX ****************************************/
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&éè])[A-Za-z\d@$!%*#?&éè]{8,32}$/; // Minimum 8 caractères, au moins une lettre, un chiffre et un caractère spécial
  const regexLetter = /[a-zA-Z]/g; // Check si le string contient au moins une lettre
  const regexNum = /\d/; // Check s'il y a un chiffre
  const regexSpecial = /[@$!%*#?&éè]/;
  const regexMinMax = /^.{8,32}$/; // Check si le mdp contient minimum 8 caractères et maximum 32

  //********************************** LES FONCTIONS ***************************************/

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);

    if (regexLetter.test(e.target.value)) {
      setIsLetterOk(true);
    } else {
      setIsLetterOk(false);
    }
    if (regexNum.test(e.target.value)) {
      setIsNumberOk(true);
    } else {
      setIsNumberOk(false);
    }
    if (regexSpecial.test(e.target.value)) {
      setIsSpecialOk(true);
    } else {
      setIsSpecialOk(false);
    }
    if (regexMinMax.test(e.target.value)) {
      setIsMinMaxOk(true);
    } else {
      setIsMinMaxOk(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (
      password !== controlPassword ||
      !regexPassword.test(password) ||
      (!isLetterOk && !isNumberOk && !isSpecialOk && !isMinMaxOk)
    ) {
      if (password !== controlPassword) {
        setErrors({
          ...errors,
          passwordConfirm: "Les mots de passe ne sont pas identiques",
        });
      } else {
        setErrors({ ...errors, passwordConfirm: "" });
      }
      if (currentPassword) return;
    } else {
      const id = JSON.parse(localStorage.getItem("user_info")).user.user_id;
      setErrors({});
      axios({
        method: "PUT",
        url: `http://localhost:4200/api/user/${id}/password`,
        withCredentials: true,
        data: {
          user_password: currentPassword,
          newPassword: password,
        },
      })
        .then((res) => {
          setPasswordChanged(true);
          console.log("mot de passe changé");
        })
        .catch((err) => {
          setErrors({
            ...errors,
            currentPassword: err.response.data.message,
          });
        });
    }
  };

  return (
    <div className="containerGlobal">
      <button onClick={() => setIsChangingPass(true)}>
        Changer le mot de passe
      </button>
      {!isChangingPass ? (
        <></>
      ) : (
        <div>
          <form action="" onSubmit={handleChangePassword}>
            <label>Mot de passe actuel</label>
            <input
              type="password"
              name="password"
              id="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <p className="form-container-error">{errors.currentPassword}</p>
            <br />

            <label>Nouveau mot de passe</label>
            <input
              type="password"
              name="password"
              id="newPassword"
              value={password}
              onChange={handlePasswordInput}
            />
            <div>
              <ul>
                <li className={isLetterOk ? "password-ok" : "password-not"}>
                  Une lettre
                </li>
                <li className={isNumberOk ? "password-ok" : "password-not"}>
                  Un chiffre
                </li>
                <li className={isSpecialOk ? "password-ok" : "password-not"}>
                  Un caractère spécial
                </li>
                <li className={isMinMaxOk ? "password-ok" : "password-not"}>
                  8-32 caractères
                </li>
              </ul>
            </div>

            <label>Confirmation</label>
            <input
              type="password"
              name="password"
              id="newPasswordConfirm"
              value={controlPassword}
              onChange={(e) => setControlPassword(e.target.value)}
            />
            <p className="form-container-error">{errors.passwordConfirm}</p>
            <button type="submit" value="Changer">
              Changer
            </button>
            <button onClick={() => setIsChangingPass(false)}>Annuler</button>
          </form>
        </div>
      )}
      {passwordChanged
        ? `${alert("Mot de passe enregistré")} ${(window.location.href =
            "/home")} `
        : ""}
    </div>
  );
};

export default ProfilSettings;
