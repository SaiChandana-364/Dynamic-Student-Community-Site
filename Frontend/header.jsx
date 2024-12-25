import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import './header.css'

function Header(){
  let navigate = useNavigate();
    return(
        <header classNameName="p-3 mb-3 m-3">
        <div className="container-fluid m-0 p-0" style={{backgroundColor:"#5496BF"}}>
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/home" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <img src="/logo.jpg" alt="Logo" className="shadow-lg rounded-circle" style={{height:"50px", width:"50px"}}/>
            </a>
    
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/home" className="nav-link px-2 link-dark">Home</a></li>
              <li><a href="/general" className="nav-link px-2 link-dark">General</a></li>
              <li><a href="/announcements" className="nav-link px-2 link-dark">Announcements</a></li>
              <li><a href="/polls" className="nav-link px-2 link-dark">Polls</a></li>
              {/* <li><a href="/resources" className="nav-link px-2 link-dark">Resources</a></li> */}
              <li><a href="/complaints" className="nav-link px-2 link-dark">Complaints</a></li>
            </ul>
    
            {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
            </form> */}
            <div className='text-end'>
              <button className='btn make-btn btn-outline ' onClick={()=>navigate('/create')}>Create Post</button></div>
            <div className="dropdown text-end">
              <a href="./header" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://as2.ftcdn.net/v2/jpg/04/62/63/65/1000_F_462636502_9cDAYuyVvBY4qYJlHjW7vqar5HYS8h8x.jpg" alt="mdo" width="32" height="32" className="rounded-circle"/>
              </a>
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                {/* <li><a className="dropdown-item" href="./settings">Settings</a></li>
                <li><a className="dropdown-item" href="./profile">Profile</a></li>
                <li><hr className="dropdown-divider"/></li> */}
                <li><a className="dropdown-item" href="/reset">Reset Password</a></li>
                <li><a className="dropdown-item" href="/">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;