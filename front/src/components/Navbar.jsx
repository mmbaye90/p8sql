import { NavLink } from "react-router-dom";
import logo from "../img/logo.png"
import "../Styles/stylesComp/navbar.css"
import { logout,getUserId } from "../servicies/authApi";

const Navbar = () => {

  const handleLogout = () => {
    logout();
  }
const uid = getUserId()
console.log(` userID => ${uid}`);

  return (
    <nav className="navbar">
      <span className="containerLogo"><img src={logo} alt="logo"  /></span>

      <div className="containerItmamNav" >
        <ul >
          {uid ?(
               <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">
                    Home
                </NavLink>
                <li className="nav-item">
                <NavLink className="nav-link" to="/profil/:id"activeClassName="active">
                  Mon profil
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn" onClick={handleLogout}>Déconnexion</button>
              </li>

              </li>
          
          ):(
            <ul className="ul2">
            <li className="nav-item">
                <NavLink className="nav-link" to="/"activeClassName="active1">
                    Se connecter
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signup" activeClassName="active">
                    S'inscrire
                </NavLink>
            </li>
            </ul>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;