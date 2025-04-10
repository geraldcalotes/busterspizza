import './Login.css';
import logo from '../assets/logo.png';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
  //set values of the select branch dropdown
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //for input boxes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const navigate = useNavigate();
  // const userData = {
  //   id:123,
  //   name:'Test',
  //   email:'email@test.com'
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: username,
        password: password
      });
      
      if (response.data.success) {
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(response.data.data));
        // navigate(`/dashboard/${username}`);
        const userData = {username:username,access_level:response.data.data.access_level};
        navigate('/dashboard',{ state: userData}); // Navigate to dashboard or home page
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/branches');
        const data = response.data;
        const branchesArray = Array.isArray(data) ? data : 
                (data && Array.isArray(data.data)) ? data.data : [];
        console.log(data);
        setBranches(branchesArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="login-box">
        <div className="login-header">
          <header><img src={logo} alt="Buster's Pizza logo" /></header>
        </div>
            
        <div className="input-box">
          <select className="input-field" style={{ height: '50px', padding: '0 15px', marginBottom: '50px',color:'black' }} required>
            <option value="" disabled defaultValue>Select Branch</option>
            <option value="Red Deer North">Red Deer North</option>
            <option value="Red Deer South">Red Deer South</option>
            {loading ? (
              <option disabled>Loading branches...</option>
            ) : error ? (
              <option disabled>Error: {error}</option>
            ) : (
              branches.map(branch => (
                <option key={branch.store_id} value={branch.store_id}>
                  {branch.store_name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="input-box">
          <input type="text" id='username' className="input-field" placeholder="EmployeeID" autoComplete="off" required 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                maxLength={30}/>
        </div>
        
        <div className="input-box">
          <input type="password" id='password' className="input-field" placeholder="Password" autoComplete="off" required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={30}/>
        </div>
        
        <div className="forgot">
          <section>
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember me</label>
          </section>
          <section>
            <a href="#">Forgot Password</a>
          </section>
        </div>
        
        <div className="input-submit">
          <button className="submit-btn" id="submit" >Sign In</button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Login;
