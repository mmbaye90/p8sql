import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../../Styles/stylesComp/description.css";

const Description = ({ fetchProfilById, email, bio }) => {
  const [updateForm, setUpdateForm] = useState(false); //Affichage cond du textearea avec les btns
  const [description, setDescription] = useState("");
  const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;

  const updateBio = (e) => {
    e.preventDefault();

    axios({
      method: "PUT",
      url: `http://localhost:4200/api/user/${user_id}`,
      withCredentials: true,
      data: {
        user_description: description,
      },
    })
      .then((res) => {
        fetchProfilById();

        setUpdateForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProfilById();
  }, [fetchProfilById]);

  return (
    <>
      <form action="" onSubmit={updateBio}>
        <h4>E-mail</h4>
        <p className="mail">{email}</p>
        <h4>Description</h4>
        <p>{bio === "undefined" || null || "" ? "Pas de description" : bio} </p>
        {updateForm === false && (
          <>
            <textarea
              placeholder="Votre modif ici"
              onClick={() => {
                setUpdateForm(!updateForm);
              }}
            ></textarea>
            <button
              onClick={() => {
                setUpdateForm(!updateForm);
              }}
            >
              Modifier bio
            </button>
          </>
        )}
        {updateForm && (
          <>
            <textarea
              placeholder="Votre modif ici"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <button onClick={updateBio}>validez </button>
            <button
              onClick={() => {
                setUpdateForm(!updateForm);
              }}
            >
              Annuler
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Description;
