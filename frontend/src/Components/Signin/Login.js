import React, { useEffect, useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"
import { AuthContext } from '../../contextapi';
const baseUrl="https://realestate-hd4t.onrender.com"
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/login`, { email, password });
      // Store token in local storage or other secure storage
      updateToken(response.data.token);
      
      // Navigate to protected page
      window.location.href = '/';
    } catch (error) {
      // Handle error message
      console.error(error.response.data);
    }
  };

  return (
    <div className="my-container">
      
      <form onSubmit={handleSubmit} >
        <div className="login-card">
          
          <label  className="form-label fs-5 text-black">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <label  className="form-label fs-5 text-black">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <div className="login-btn">
            <Link to="/signup">
              <p>Don't have and account?</p>
            </Link>
            <button className="btn mt-2 rounded-2 #f57f17 yellow darken-4"  type="submit">Login</button>
           
          </div>
        </div>
      </form>
    </div>
  );
}


export default Login