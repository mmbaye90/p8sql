import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
// import signup from "../../img/signup.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/stylesComp/header.css";

const HeaderLog = () => {
  return (
    <nav className="navbar">
      <span className="containerLogo">
        <img src={logo} alt="logo" />
      </span>
      <ul className="contItem">
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            <FontAwesomeIcon icon={faSignIn} />
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link " to="/">
            <img src={signup} alt="inscription" className="imginscription" />
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default HeaderLog;
