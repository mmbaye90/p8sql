import React, { useEffect, useLayoutEffect, useState } from "react";
import ProfilSettings from "../../components/Profil/ProfilSettings";
import Description from "../../components/Profil/Description";
import ProfilPicture from "../../components/Profil/ProfilPicture";
import DeleteProfil from "../../components/Profil/DeleteProfil";
import Navbar from "../../components/Navbar";
import "../../Styles/stylesPages/profil.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // ******************************** Les states *************************
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileAdmin, setIsProfileAdmin] = useState(false);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [membre, setMembre] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;
  const navigate = useNavigate();

  // ****************************** FN ****************************
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

  const fetchProfilById = () => {
    const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;
    axios({
      method: "GET",
      url: `http://localhost:4200/api/user/${user_id}`,
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res.data[0]);
        setUserFirstName(res.data[0].user_firstname);
        setUserLastName(res.data[0].user_lastname);
        setBio(res.data[0].user_description);
        setIsProfileAdmin(res.data[0].admin === 1); //Pour la gestion admin  et aff cond employé ou admin
        setEmail(res.data[0].user_email);
        setMembre(res.data[0].createdAt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //*********************************************** LES EFFETS ************************************************** /
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    } else {
      const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
      if (admin === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [navigate]);

  useLayoutEffect(() => {
    getProfilePicture();
    fetchProfilById();
  });

  return (
    <>
      <Navbar
        getProfilePicture={getProfilePicture}
        imageUrl={imageUrl}
        isAdmin={isAdmin}
      />
      <section className="ContainerProfil">
        <div className="profilTop">
          <div className="profilLeft">
            <ProfilPicture
              userFirstName={userFirstName}
              userLastName={userLastName}
              getProfilePicture={getProfilePicture}
              imageUrl={imageUrl}
              isProfileAdmin={isProfileAdmin}
              membre={membre}
            />
          </div>
          <div className="profilright">
            <Description
              fetchProfilById={fetchProfilById}
              bio={bio}
              email={email}
            />
          </div>
        </div>
        <hr />
        <div className="containerDeleteChangePw">
          <div className="changePw">
          <ProfilSettings />
          </div>
          <div className="delete">
          <DeleteProfil />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Profile;
