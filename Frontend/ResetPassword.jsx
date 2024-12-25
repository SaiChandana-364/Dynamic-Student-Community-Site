import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
      
        // Create a request body to send to the backend
        const requestBody = {
          email: email,
          password: password,
          confirmPassword: confirmPassword
        };
      
        try {
          const response = await axios.post('http://localhost:8080/reset', requestBody);
          // Handle the response from the backend
          if (response.data==="Password reset successful") {
            alert('Password reset successful!');
            // Redirect to login page or other appropriate page
            navigate('/');
          } else {
            alert('Password reset failed: ' + response.data.message);
          }
        } catch (error) {
          console.error('Error during password reset:', error);
          alert('An error occurred. Please try again later.');
        }
      };
    
    return(<div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mx-auto" style={{ height: '300px', paddingTop: '100px' }}>
            <div className="card">
              <div className="card-body">
                <h2>Reset Password</h2>
                <form onSubmit={(e) => onSubmit(e)} >
                  <div className="form-group">
                    Enter your email:
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmpassword"
                      value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ResetPassword;