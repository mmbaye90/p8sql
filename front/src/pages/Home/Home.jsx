import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPost from "../../components/Home/NewPost";
import Posts from "../../components/Home/Posts";
import Navbar from "../../components/Navbar";
import "../../Styles/stylesPages/home.css";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  //*************************************************** LES FONCTIONS **********************************/
  // useEffect(()=>{
  //   const fetchData = async ()=>{
  //     const result = await axios({
  //       method: "GET",
  //       url: `http://localhost:4200/api/post`,
  //       withCredentials: true,
  //             data: {
  //       user_id: userId,
  //     },
  
  //     })
  //     setAllPosts(result.data)
  //   }
  //   fetchData()
  // },[userId])

  const fetchAllPosts = () => {
    axios({
      method: "GET",
      url: `http://localhost:4200/api/post`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        setAllPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
useEffect(()=>{
  fetchAllPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[userId])
  //********************************************  LES EFFETS  *******************************************/
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const storageUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    setUserId(storageUserId);
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    if (admin === 1) {
      setIsAdmin(true);
    }
    // fetchAllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // useEffect(() => {
    // fetchAllPosts();
    
  // });

  return (
    <>
      <Navbar />
      <div className="containerHomepage">
        <div>
          <NewPost
          fetchAllPosts={fetchAllPosts} 
          />
        </div>
        <div>
          <Posts
            allPosts={allPosts}
            userId={userId}
            // getProfilePicture={getProfilePicture}
            fetchAllPosts={fetchAllPosts}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
