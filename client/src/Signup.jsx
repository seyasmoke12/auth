import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import { BACKENDURL } from './helper/Urls';
function Signup() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmite = (e)=>{
        e.preventDefault()
        axios.post(`${BACKENDURL}/register`,{name,email,password})
        navigate("/login")
        .then(resulte => console.log(resulte))
        .catch(err=>console.log(err))
    }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmite}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
