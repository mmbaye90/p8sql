import React, { useState } from 'react';
import axios from "axios"

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
        <div>
                  <div className="delete-user-profil__container">
        <button
          className="delete-user-profil__btn"
          onClick={handleDeleteProfile}
        >
          Supprimer votre compte
        </button>
        <h4>Cette action est définitive.</h4>
        <p>
          Lorsque vous supprimez votre compte Groupomania, vous ne pouvez plus
          en récupérer le contenu ou les informations que vous avez partagées.
        </p>
      </div>
        {handleDelete && (
        <div className="deleteMessage">
          <div className="deleteMessageBox">
            <p>Voulez-vous vraiment supprimer définitivement votre compte ?</p>
            <div className="deleteBtn">
              <button onClick={handleDeleteAccount}>Oui</button>
              <button onClick={() => setHandleDelete(false)}>Non</button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default DeleteProfil;