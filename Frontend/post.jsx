import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./post.css";
import Comments from '../comments/comments';
import axios from 'axios';

const Post = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [values, setValues] = useState(post.values.split("").map(Number));
  const [likes, setLikes] = useState(parseInt(post.likes));
  const [hasLiked, setHasLiked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [commentInput, setCommentInput] = useState(""); // State for comment input
  const [comments, setComments] = useState([]);
  const typeNames = {
    1: "Announcements",
    2: "Polls",
    3: "Academic",
    4: "General",
    5: "Complaints"
  };

  // Function to handle comment input change
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/${post.pid}`);
      setComments(response.data); // Set fetched comments
      console.log(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to submit comment
  const handleCommentSubmit = async () => {
    if (commentInput.trim() === "") return; // Prevent empty comments
  
    const comment = {
      userName: "User One", 
      profilePic: "../logo192.png", 
      content: commentInput,
      post: { pid: post.pid } 
    };
  
    try {
      const response = await axios.post('http://localhost:8080/add', comment, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Comment added:", response.data);
      setCommentInput(""); // Clear input after submission
      setComments([...comments, response.data]); // Update comments array
      let num=Number(post.comments);
      num += 1;
      post.comments=num.toString(); // Increment the comment count in the post object
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  const handleVote = async (index) => {
    const updatedValues = [...values];
    updatedValues[index] += 1;
    setValues(updatedValues);

    const updatedValuesString = updatedValues.join(""); 
    try {
      await axios.put('http://localhost:8080/updateVotes', {
        pid: Number(post.pid),
        values: updatedValuesString,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setHasVoted(true);
    } catch (error) {
      console.error("Error updating vote:", error);
      updatedValues[index] -= 1;
      setValues(updatedValues);
    }
  };

  const handleLike = async () => {
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setHasLiked(!hasLiked);

    try {
      await axios.put('http://localhost:8080/updateLikes', {
        pid: Number(post.pid),
        likes: newLikes,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Error updating like:", error);
      setLikes(hasLiked ? likes + 1 : likes - 1);
      setHasLiked(hasLiked);
    }
  };

  const handleCommentsClick = () => {
    setIsCommenting(!isCommenting);
    if (!isCommenting) {
      fetchComments(); 
    }
  };

  return (
    <div className="post col-md-10 mx-auto px-3 py-3 justify-content-center gap-3">
      <div className="postHeader d-flex flex-row align-items-start gap-0">
        <img src="https://as2.ftcdn.net/v2/jpg/04/62/63/65/1000_F_462636502_9cDAYuyVvBY4qYJlHjW7vqar5HYS8h8x.jpg" 
        className="rounded-circle" style={{ height: '50px', width: '50px' }} alt="profile" />
        <div className="d-flex flex-column px-3">
          <p className="userName">Sample User</p>
          <p className="timetype">Created on: {post.time} Type: {typeNames[post.type] || "Unknown"}</p>
        </div>
      </div>

      <div className="postBody">
        <p>{post.content}</p>
      </div>

      <div className="postFooter d-flex flex-row ">
        <div className="likes" style={{ width: '100px', cursor: 'pointer', color: hasLiked ? 'blue' : 'black' }} 
        onClick={handleLike}>
          <ThumbUpIcon /> {likes} Likes
        </div>
        <div className="comments" style={{ cursor: 'pointer' }} onClick={handleCommentsClick}>
          <MessageOutlinedIcon /> {post.comments} Comments
        </div><br />
      </div>

      {isCommenting && (
        <div className="write d-flex flex-column gap-2 ">
          <input
            type="text"
            placeholder="Write a comment"
            value={commentInput}
            onChange={handleCommentChange} // Handle input change
          />
          <button className='send-com' onClick={handleCommentSubmit}>Send</button> {/* Submit comment */}
          <Comments comments={comments}/>
        </div>
      )}
    </div>
  );
};

export default Post;
