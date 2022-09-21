import React, { useState } from "react";
import axios from "axios";
import "../../Styles/stylesComp/delete.css"

const DeleteProfil = () => {
  const [handleDelete, setHandleDelete] = useState(false);

  const handleDeleteProfile = () => {
    setHandleDelete(true);
  };

  const handleDeleteAccount = () => {
    const userId = JSON.parse(localStorage.getItem("user_info")).user.user_id;
    axios({
      method: "GET",
      url: `http://localhost:4200/api/auth/deleteAccount/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        // window.location =`/signup`;
        return axios({
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container_delete">
        <button
          onClick={handleDeleteProfile}
        >
          Supprimer votre compte
        </button>
      {handleDelete && (
          <div className="deleteMessageBox">
            <p>êtes-vous sûr de supprimer votre compte définitivement ?</p>
            <div>
              <button onClick={handleDeleteAccount}>Oui</button>
              <button onClick={() => setHandleDelete(false)}>Non</button>
            </div>
          </div>
      )}
    </div>
  );
};

export default DeleteProfil;
