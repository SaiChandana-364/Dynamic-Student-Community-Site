import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
// import './styles.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    rollno: "",
    year: "",
    branch: "",
    email: "",
    likes: "",
  });

  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Check for empty fields
    if (!user.username) formErrors.username = "Username is required";
    if (!user.email) formErrors.email = "Email is required";
    else if (!/^[1-2][0-9][A-Za-z0-9._%+-]*@cvr\.ac\.in$/.test(user.email))
      formErrors.email = "Email not eligible for registration";
    if (!user.password) formErrors.password = "Password is required";
    if (!user.confirmPassword) formErrors.confirmPassword = "Please confirm your password";
    if (!user.rollno) formErrors.rollno = "Roll Number is required";
    if (!user.year) formErrors.year = "Year is required";
    if (!user.branch) formErrors.branch = "Branch is required";

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If the form is valid, send the data to the backend
      await axios.post("http://localhost:8080/register", user);
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mx-auto mid-col" style={{ padding: '20px' }}>
          <h2>Create Account</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter email"
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control "
                    name="password"
                    value={user.password}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Password"
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Username"
                  />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="rollno"
                    value={user.rollno}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Roll Number"
                  />
                  {errors.rollno && <div className="text-danger">{errors.rollno}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="year"
                    value={user.year}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Year"
                  />
                  {errors.year && <div className="text-danger">{errors.year}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="branch"
                    value={user.branch}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Branch"
                  />
                  {errors.branch && <div className="text-danger">{errors.branch}</div>}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
