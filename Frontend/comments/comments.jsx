import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Comment from '../comment/comment';
import './comments.css';

const Comments = ({comments}) => {
      return <div className="posts col-md-10 gap-2">
    {comments.map(comment=>(
      <Comment comment={{comment}} key={comment.pid}/> 
    ))}
  </div>;
};

export default Comments;