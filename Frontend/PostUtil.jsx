import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function PostUtil(){
    return(
        // <>
      <div className='util d-flex flex-row gap-3 py-2' style={{height:"60px"}}>
        
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> 
            Sort by
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item">Newest First</li>
            <li className="dropdown-item">Newest Last</li>
          </ul>
        </div>

        <div className="search" style={{width:"50%"}}>
          <input placeholder='Search posts' />
        </div>
      </div>
    );
}

export default PostUtil;