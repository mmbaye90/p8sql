import React, { useEffect } from "react";
import Comment from "../Comment/Comment";

const Comments = ({ post_id, userId, post, isAdmin,allcomments,fetchAllComments }) => {
  // const [allcomments, setAllcomments] = useState([]);
  useEffect(() => {
    fetchAllComments();
  });

  return (
    <div className="comments">
    {allcomments ? allcomments.map((allCommentaire) => (
      <Comment
      allCommentaire={allCommentaire}
      key={allCommentaire.id}
      post={post}
      isAdmin={isAdmin}
      userId={userId}
      fetchAllComments={fetchAllComments}
       />
    )) : ''}
  </div>
  );
};

export default Comments;
