import { NavLink, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "../Styles/stylesComp/navbar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
// import defaultProfil from "../img/anonymousUser.svg";
// import signup from "../img/signup.png"

const Navbar = () => {
  const navigate = useNavigate();
  // const [uid,setUid] = useState();
  // const[imgUrl ,setImgUrl] = useState("");
  const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;
  const [imageUrl, setImageUrl] = useState();

  const getProfilePicture = () => {
    axios({
      method: "GET",
      url: `http://localhost:4200/api/user/${user_id}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data[0].user_picture) {
          setImageUrl(res.data[0].user_picture);
        } else {
          setImageUrl(`http://localhost:4200/images/anonymousUser.svg`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/");
      return;
    }
    // const storageUserId = JSON.parse(localStorage.getItem("user_info")).user.user_id;
    // setUid(storageUserId);
    // const picture = JSON.parse(localStorage.getItem("user_info")).user.user_picture;
    // if(picture) setImgUrl(picture)
    // else setImgUrl(defaultProfil)
  }, [navigate]);

  useEffect(() => {
    getProfilePicture();
  });

  const logout = () => {
    axios({
      method: "GET",
      url: `http://localhost:4200/api/auth/logout`,
      withCredentials: true,
    })
      .then((res) => {
        localStorage.clear();
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar">
      <span className="containerLogo">
        <img src={logo} alt="logo" />
      </span>

      <div className="containerItmamNav">
        <span className="nav-item">
          <NavLink className="nav-link" to="/home">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
        </span>
        <span className="nav-item">
          <NavLink className="nav-link" to="/profil">
            <img src={imageUrl} alt="profiluser" className="avatar" />
          </NavLink>
        </span>
        <button className="btn" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
