import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import UploadComment from '../Comment/UploadComment';
import Comments from './Comments';

const CardPost = ({post,isAdmin}) => {
  const [isPostUser, setIsPostUser] = useState(false);
  const { post_id, post_user_id } = post;
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user_info")).user
  .user_id;


  const navigate = useNavigate();

  //********************************************** LES FN *********************************/
  const handleProfilPage = () => {
    navigate(`/profil`);
  };

  const fetchLikes = () => {
    axios({
      method: "POST",
      url: `http://localhost:4200/api/post/${post_id}/postLikedByUser`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeCount = () => {
    axios({
      method: "POST",
      url: `http://localhost:4200/api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        setCountLikes(res.data[0].total);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleLike = () => {
    axios({
      method: "PATCH",
      url: `http://localhost:4200/api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        handleLikeCount();
      })
      .catch((err) => {
        console.log(`Echec like post : ${err}`);
      });
  };

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:4200/api/post/${post_id}`,
      withCredentials: true,
      data: {
        post_id,
        post_user_id: userId,
      },
    })
      .then((res) => {
        // fetchAllPosts();
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
  };



  useEffect(() => {
    if (post.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    } else {
      setIsPostUser(false);
    }
  }, [post,isAdmin,userId]);

  useEffect(() => {
    handleLikeCount();
    fetchLikes();
  }, [handleLike,fetchLikes]);
  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <div
            className="post-container-top-img-container"
            onClick={(e) => navigate(`/profil/${post_user_id}`)}
          >
            <img
              className="imgPic"
              src={post.user_picture}
              alt="imgeProfil"
            />
          </div>

          <div className="post-container-top-infos">
            <p
              key={`${post.post_user_id}${post.date_creation}`}
              className="post-container-top-name"
              onClick={handleProfilPage}
            >
              {post.user_firstname} {post.user_lastname}
            </p>
          </div>
        </div>
        <div className="post-container-message" key={`${post.post_user_id}`}>
          {post.content}
        </div>
        <div className="container_img_post">
          <img src={post.post_imageUrl?post.post_imageUrl :""} alt=''/>
        </div>
        <div className="post-container-countlikes">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="post-container-countlikes-icon"
          />
          <span className="post-container-countlikes-count">{countLikes}</span>
        </div>
        <hr />
        <div className="post-container-end">
          {isLiked && (
            <button onClick={handleLike} className="post-container-end__liked">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
              <span>J'aime</span>
            </button>
          )}
          {!isLiked && (
            <button onClick={handleLike} className="post-container-end__like">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
              <span>J'aime</span>
            </button>
            
          )}
          {<div>
            <UploadComment
            post_id = {post_id}
            userId={userId}
          />
          <Comments
            post_id = {post_id}
            post ={post}
            userId={userId}
            isAdmin={isAdmin}
          />
          </div>}
          {isPostUser && (
            <button
              className="post-container-end__delete"
              onClick={() => {
                handleDelete(post.post_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <span>Supprimer</span>
            </button>
          )}
        </div>
      </div>
      <div className="post-container-comments">
        <div className="post-container-comments-users">
        </div>
        <p className="comment-error"></p>
      </div>
    </>
  );};


export default CardPost;