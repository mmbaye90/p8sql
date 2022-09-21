import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import photoProfil from "../../img/anonymousUser.svg"
import "../../Styles/stylesComp/profilPic.css";

const ProfilPicture = ({
  getProfilePicture,
  imageUrl,
  userLastName,
  userFirstName,
  isProfileAdmin,
  membre,
}) => {
  const [file, setFile] = useState(null);
  const [isFile, setIsFile] = useState(null);
  const inputFile = useRef(null);
  // const uid = JSON.parse(localStorage.getItem("user_info")).user.user_id;
  // const[imageUrl,setImageUrl] = useState()
  // const [isUserProfile,setIsUserProfile]= useState()

  //Gérer la gestion de la prévisualisation de l'image aprés click
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPic = () => {
    inputFile.current.click();
  };

  const uploadPicture = (e) => {
    // e.preventDefault();
    const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;

    const data = new FormData();
    data.append("avatar", file);

    axios({
      method: "PUT",
      url: `http://localhost:4200/api/user/${user_id}`,
      withCredentials: true,
      data,
    })
      .then((res) => {
        setFile(null);
        getProfilePicture();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (file) {
      setIsFile(true);
    } else {
      setIsFile(false);
    }
  }, [file]);

  useEffect(() => {
    getProfilePicture();
  }, [getProfilePicture]);

  useEffect(() => {
    if (file) {
      setIsFile(true);
    } else {
      setIsFile(false);
    }
  }, [file]);

  return (
    <form action='' onSubmit={uploadPicture} > 
      <div className="containerImg">
        {file?<img className="userPicture" src={URL.createObjectURL(file)} alt="" />:<img src={imageUrl} alt=""/>}
      </div>
      <div className="labelModif">
          <label  htmlFor='avatar' onClick={handleUploadPic}> Modifier photo </label>
          <input
            type="file"
            id="profil_image"
            ref={inputFile}
            accept="image/png, image/jpeg"
            name="profil_image"
            onChange={handleFileChange}
          />
      </div>
          {isFile ? (
            <input  type="submit" value="envoyer"/>
          ) : (
            <></>
          )}
        {/* </> */}
      {/* )} */}
    </form>
  );
};

export default ProfilPicture;
