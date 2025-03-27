import './App.css'
import logo from './assets/logo.png';

function App() {

  return (
    <>
      <div>
         <div className="login-box">
        <div className="login-header">
            <header><img src={logo} alt="Buster's Pizza logo" /></header>
        </div>
        <div className="input-box">
            <select class="input-field" name="branch" required style={{ height: '50px', padding: '0 15px',marginBottom:'50px' }}>
                <option value="" disabled selected>Select Branch</option>
                <option value="downtown">Downtown</option>
                <option value="uptown">Uptown</option>
                <option value="eastside">Eastside</option>
                <option value="westside">Westside</option>
            </select>
        </div>
        
        <div class="input-box">
            <input type="text" class="input-field" placeholder="EmployeeID" autocomplete="off" required />
        </div>
        <div class="input-box">
            <input type="password" class="input-field" placeholder="Password" autocomplete="off" required />
        </div>
        <div class="forgot">
            <section>
                <input type="checkbox" id="check" />
                <label>Remember me</label>
            </section>
            <section>
                <a href="#">Forgot Password</a>
            </section>
        </div>
        <div class="input-submit">
            <button class="submit-btn" id="submit"></button>
            <label for="submit">Sign In</label>
        </div>
       
    </div>
      </div>
    </>
  )
}

export default App
