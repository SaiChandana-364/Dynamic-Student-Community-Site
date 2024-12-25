import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Posts from './posts/Posts';
import Header from './header';

function PostType({ name, posts }) {
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    // Sort posts based on the selected sort order
    const sorted = [...posts].sort((a, b) => {
      const dateA = new Date(Date.parse(a.time.replace(' IST', ''))); // Remove 'IST' for compatibility
      const dateB = new Date(Date.parse(b.time.replace(' IST', ''))); // Remove 'IST' for compatibility
      return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
    });
    setSortedPosts(sorted);
  }, [sortOrder, posts]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <>
      <Header />
      <div className="justify-items-between" style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <div className="main px-5 py-3 gap-3">
          <h2>{name} Posts</h2>
          <div className='util d-flex flex-column gap-3 py-2' style={{ height: "60px" }}>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by: {sortOrder}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li onClick={() => handleSortChange("Newest First")} className="dropdown-item">Newest First</li>
                <li onClick={() => handleSortChange("Newest Last")} className="dropdown-item">Newest Last</li>
              </ul>
            </div>
          </div>
          <div className="post-list">
            {sortedPosts.length === 0 ? (
              <p>No posts yet</p> // Display message if there are no posts
            ) : (
              <Posts allPosts={sortedPosts} /> 
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostType;


