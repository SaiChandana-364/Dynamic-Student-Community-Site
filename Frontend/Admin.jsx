import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Posts from '../components/posts/Posts';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [activeTab, setActiveTab] = useState('user-management');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (email) => {
    try {
      await axios.delete(`http://localhost:8080/users/${email}`);
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const viewUser = (user) => {
    navigate(`/showUser`, { state: { user: user } });
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <header className="p-0 mb-3 border-bottom">
        <div className="container-fluid m-0 p-0" style={{ backgroundColor: "#5496BF" }}>
          <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <img src="logo.jpg" alt="Logo" className="shadow-lg rounded-circle" style={{ height: "50px", width: "50px" }} />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => handleTabClick('user-management')}
                className={`nav-link px-2 link-dark ${activeTab === 'user-management' ? 'active' : ''}`}
              >
                <b>User Management</b>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="container mt-3">
        {activeTab === 'user-management' && (
          <div>
            <h3>All Users</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Roll No</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.rollno}</td>
                      <td>{user.branch}</td>
                      <td>{user.year}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteUser(user.email)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => viewUser(user)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'post-management' && (
          <div>
            <h2>Post Management</h2>
            <Posts />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
