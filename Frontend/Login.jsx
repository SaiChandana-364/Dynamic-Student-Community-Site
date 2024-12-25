import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import './login.css';
import { Link } from 'react-router-dom';
// import bcrypt from 'bcryptjs';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState({
  //   username: "",
  //   password: "",
  //   rollno: "",
  //   year: "",
  //   branch: "",
  //   email: "",
  //   likes: "",
  // });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(email==="moderator@gmail.com" && password==="moderator"){
      navigate('/moderate');
    }
    else{
    try {
      // const hashedPassword = bcrypt.hashSync(password, 10);
      // setPassword(hashedPassword);
      // console.log(hashedPassword);
      // Prepare the data to send to the backend
      const loginData = {
        email,
        password,
      };
  
      // Send the POST request to the backend login endpoint
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log(response.data);
      // const data = response.data.split("Login successful");
      // const uid = data[1];
      // Handle the response from the backend
      if (response.data.startsWith("Login successful")) {
        navigate('/home', /*{ state: { uid } }*/);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mx-auto" style={{ height: '300px', paddingTop: '100px' }}>
          <div className="card">
            <div className="card-body">
              <h2>Login</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  Enter your email:
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={onInputChange}
                    value={email}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  Enter your password
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={onInputChange}
                    value={password}
                    placeholder="Password"
                  />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">Log In</button>
                <div id="message">
                  <p></p>
                </div>
              </form>
              <div className="text-center mt-3">
                <Link to="/register" className="text-decoration-underline">Don't have an account? Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
