import './App.css'
import logo from './assets/logo.png';

function App() {

  return (
    <>
      <div>
         <div class="login-box">
        <div class="login-header">
            <header><img src={logo} alt="Buster's Pizza logo" /></header>
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
