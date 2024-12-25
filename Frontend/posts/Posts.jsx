import React from 'react';
import Post from "../post/Post";
import "./posts.css";

const Posts = ({allPosts}) => {
  console.log(allPosts);
  return (
    <>
  <div className="posts col-md-10 mx-auto gap-2">
{allPosts.map((post) => (
  post.pid && <Post post={post} key={post.pid} />
))}
</div>
</>
  );
};

export default Posts;