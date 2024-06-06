// import { response } from 'express';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

const [credentials, setCredentials] = useState({ username: "", password: "", email: ""});
const { username, password, email } = credentials;
const navigate = useNavigate();

const handleChange = (e) => {
  const {name, value} = e.target;
  setCredentials({...credentials, [name]: value});
}

const handleSubmit = (e) => {
  e.preventDefault();
  handleRegister();
}

const handleRegister = () => {
  fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Registration Successful:", data);
      setCredentials({username:"", password:"", email:""});
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};


  return (
      <>
      <form action="submit" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input className="form-control mb-2" type="text" name="username" value={username} onChange={handleChange}/>
      </div>
      <div>
          <label htmlFor="email">Email</label>
          <input className="form-control mb-2" type="email" name="email" value={email} onChange={handleChange} />
        </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="form-control mb-2" type="text" name="password" value={password} onChange={handleChange}/>
      </div>
      <button className="btn btn-outline-secondary">Register</button>
      </form>
      <div>
        <p>Already registered? Login <Link Link to="/">here</Link></p>
      </div>
      </>
    )

