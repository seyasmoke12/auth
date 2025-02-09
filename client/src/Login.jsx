import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from 'react-router';
import { useState } from 'react';
import axios from "axios"
import {BACKENDURL} from "./helper/Urls"
function Login() {
      const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error, setError] = useState('');
    const navigate = useNavigate()
const handleSubmit = (e) => {
  e.preventDefault();
  setError("")
  axios.post(`${BACKENDURL}/login`, { email, password })
    .then(response => {
      if (response.data.status === "success") {
        // Store user data in context/state/localStorage
        console.log("Logged in user:", response.data.user);
        navigate("/home");
      }
    })
    .catch(err => {
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.error);
      } else if (err.request) {
        // No response received
        setError("Server connection failed");
      } else {
        // Other errors
        setError("An error occurred");
      }
    });
};
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
            
          <div className="mb-3">
        {error && <div className="error-message alert alert-danger">{error}</div>}
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <Link to="/register" className="text-decoration-none">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

