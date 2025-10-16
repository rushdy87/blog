import { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:5001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id} className="list-group-item">
        {comment.content}
      </li>
    );
  });

  if (comments.length) {
    return <ul className="list-group">{renderedComments}</ul>;
  }

  return <div>No comments yet</div>;
};

export default CommentList;
