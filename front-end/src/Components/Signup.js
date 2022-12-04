import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/v1/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })

    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem("token", json.authtoken);

    if (json.success) {
      //redirect
      navigate("/");
      props.showAlert("Account created successfully", "Success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }

  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <>
      <div className='mt-3'>
        
        <h2>Signup to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />

          </div>
          <div className="mt-2">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" />
          </div>

          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>

      </div>


    </>
  )
}

export default Signup
