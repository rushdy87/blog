const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id} className="list-group-item border-0">
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
