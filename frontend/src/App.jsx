import './App.css';
import logo from './assets/logo.png';
import { useState, useEffect } from 'react';



function App() {
  const [selectedBranch, setSelectedBranch] = useState('');
const [branches, setBranches] = useState([]);

useEffect(() => {
  fetch('http://localhost:3001/branches')
    .then(response => response.json())
    .then(data => setBranches(data))
    .catch(error => console.error('Error fetching branches:', error));
}, []);

  return (
    <>
      <div>
        <div className="login-box">
          <div className="login-header">
            <header><img src={logo} alt="Buster's Pizza logo" /></header>
          </div>
          <div className="input-box">
            <select 
              className="input-field" 
              name="branch" 
              required 
              style={{ height: '50px', padding: '0 15px', marginBottom: '50px' }}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="" disabled>Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="input-box">
            <input type="text" className="input-field" placeholder="EmployeeID" autoComplete="off" required />
          </div>
          <div className="input-box">
            <input type="password" className="input-field" placeholder="Password" autoComplete="off" required />
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
            <button className="submit-btn" id="submit">Sign In</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
