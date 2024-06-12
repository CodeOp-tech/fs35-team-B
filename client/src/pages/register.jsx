import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Register() {

const [credentials, setCredentials] = useState({ username: null, password: null, email:null});
const [error, setError] = useState("");
const { username, password, email } = credentials;
const navigate = useNavigate();


const handleChange = (e) => {
  const {name, value} = e.target;
  setCredentials({...credentials, [name]: value});
}

const handleSubmit = (e) => {
  e.preventDefault();
  handleRegister();
};

const handleRegister = () => {
  fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  })
  .then((response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        return Promise.reject(data);
      }
      return data;
    });
  })
  .then((data) => {
    console.log(data);
    setCredentials({ username: "", password: "", email: "" });
    navigate("/");
  })
  .catch((error) => {
    console.error(error);
    setError(error.message);
  });
};


  return (
      <>
      <div className='content register-page' >
      <form action="submit" onSubmit={handleSubmit} autoComplete='off'>
      <div>
        <label htmlFor="username">Username</label>
        <input
        required 
        className="form-control mb-2" 
        type="text" 
        name="username" 
        value={username} 
        onChange={handleChange}
        />
      </div>
      <div>
          <label htmlFor="email">Email</label>
          <input 
          required 
          className="form-control mb-2" 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleChange} />
        </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
        required 
        className="form-control mb-2" 
        type="password" 
        name="password" 
        value={password} 
        onChange={handleChange}
        autoComplete='new-password'
        />
      </div>
      <button className="btn btn-outline-secondary">Register</button>
      </form>
      {error && <div className='error'>{error}</div>}
      <div>
        <p>Already registered? Login <Link Link to="/">here</Link></p>
      </div>
      </div>
      </>
    );
  }

    //ONE attempt 
    // .then((response) => response.json()
    // .then((data) => ({status: response.status, body: data})))
    // .then(({status, body }) => {
    //   if (status === 200) {
    //     console.log(body);
    //     setCredentials({username:"",password:"",email:""});
    //     navigate("/");
    //   } else {
    //     setError(body.message);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setError("Username is Already in Use.");
    // });

  // ANOTHER atempt
  // .then((data) => {
  //   console.log(data);
  //   setCredentials({ username:"", password:"", email:""});
  //   navigate("/");
  // })
  // .catch((error) => {
  //   console.log(error);
  //   setError(error.message);
  // });
    