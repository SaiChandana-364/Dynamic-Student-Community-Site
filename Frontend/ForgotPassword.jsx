import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function ForgotPassword(){

    return(<div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mx-auto" style={{ height: '300px', paddingTop: '100px' }}>
            <div className="card">
              <div className="card-body">
                <h2>Forgot Password</h2>
                <form >
                  <div className="form-group">
                    Enter your email:
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="otp"
                      placeholder="Enter OTP sent to mail"
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

export default ForgotPassword