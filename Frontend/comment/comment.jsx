import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './comment.css'

const Comment = ({ comment }) => {

    return (
      <div className="post col-md-10 mx-auto px-3 py-3 justify-content-center gap-3">
  
        <div className="postHeader d-flex flex-row align-items-start gap-0">
            <img src={comment.comment.profilePic} className="rounded-circle" style={{height:'50px',width:'50px'}} alt="profile" />
          <div className="d-flex flex-column px-3">
              <p className='userName'>{ comment.comment.userName }</p>
              <p className='timetype'>Created on: {comment.comment.time} </p>
          </div>
        </div>
  
        <div className="postBody ">
          <p>{comment.comment.content}</p>
        </div>
  
      </div>
    );
  };
  
  export default Comment;