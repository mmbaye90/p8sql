import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Comment = ({allCommentaire,post,isAdmin,userId}) => {
    // console.log(allCommentaire.author_id);
    const [isUserOrAdmin,setIsUserOrAdmin]= useState(false);
    const id = allCommentaire.id;

    const handleDeleteComment = () => {
        axios({
          method: "DELETE",
          url: `http://localhost:4200/api/comment/${id}`,
          withCredentials: true,
        //   data: {
        //     id: singleComment.id,
        //   },
        })
          .then((res) => {
            if (res.status === 200) document.location.reload();
          })
          .catch((err) => {
            console.log(`Echec suppression de commentaire : ${err}`);
          });
      };

    useEffect(() => {
        if (userId === allCommentaire.author_id || isAdmin) {
            setIsUserOrAdmin(true);
        } else {
            setIsUserOrAdmin(false);
        }
    }, [allCommentaire.author_id,isAdmin,userId]);




    return (
        <>
        <div className="post-container-comments-comment">
          <div className="comment-container">
            <p
              className="comment-container-name"
              key={`${allCommentaire.author_id}${allCommentaire.id}`}
            >
              {`${allCommentaire.user_firstname}  ${allCommentaire.user_lastname}` }
            </p>
            {isUserOrAdmin && (
              <span className="comment-delete" onClick={handleDeleteComment}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            )}
          </div>
          <p className="comment-content">{allCommentaire.message}</p>
        </div>
    </>    
    );
};

export default Comment;