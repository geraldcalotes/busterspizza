import React, { useEffect, useRef } from 'react';
import './style.css';
import { 
  FaGauge, 
  FaUser, 
  FaStore, 
  FaClipboard, 
  FaGear, 
  FaRightFromBracket 
} from 'react-icons/fa6';
import Chart from 'chart.js/auto';

function Dashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize chart when component mounts
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ["15,000", "20,000", "40,000", "50,000"],
          datasets: [
            {
              label: "Monthly",
              backgroundColor: "#3e95cd",
              data: [5000, 7000, 9800, 10000]
            }, 
            {
              label: "Yearly",
              backgroundColor: "#8e5ea2",
              data: [15000, 22000, 25000, 30000]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Sales Overview'
            }
          }
        }
      });

      // Cleanup function to destroy chart when component unmounts
      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo"></div>
        <ul className="menu">
          <li className="active">
            <a href="#">
              <i class="fa-solid fa-gauge"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i class="fa-solid fa-user"></i>
              <span>Create Employee</span>
            </a>
          </li>

          <li>
            <a href="#">
                <i class="fa-solid fa-store"></i>
              <span>Create Branch</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i class="fa-solid fa-clipboard"></i>
              <span>Sales Backlog</span>
            </a>
          </li>

          <li>
            <a href="#">
              <i class="fa-solid fa-gear"></i>
              <span>Settings</span>
            </a>
          </li>

          <li className="logout">
            <a href="#">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="main--content">
        <div className="header--wrapper">
          <div className="header--title">
            <span>Primary</span>
            <h2>Admin Dashboard</h2>
          </div>
          <p>Admin ID:0001</p>
        </div> 

        <div className="card--container">
          <main className="content px-3 py-4">
            <div className="container-fluid">
              <div className="mb-3">
                <h3 className="fw-bold fs-4 mb-3">Summary of Reports</h3>
                <div className="row">
                  <div className="col-12 col-md-4"> 
                    <div className="card shadow">
                      <div className="card-body py-4">
                        <h6 className="mb-2 fw-bold">
                          Total Sales of Every Branch
                        </h6>
                        <p className="fw-bold">$50,125</p>
                        <div className="mb-0">
                          <span className="badge text-success me-2">+2.0%</span>
                          <span className="fw-bold">Since Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4"> 
                    <div className="card shadow">
                      <div className="card-body py-4">
                        <h6 className="mb-2 fw-bold">
                          Monthly Sales of Every Branch
                        </h6>
                        <p className="fw-bold">$10,025</p>
                        <div className="mb-0">
                          <span className="badge text-success me-2">+1.6%</span>
                          <span className="fw-bold">Since Last Month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4"> 
                    <div className="card shadow">
                      <div className="card-body py-4">
                        <h6 className="mb-2 fw-bold">
                          Yearly Sales of Every Branch
                        </h6>
                        <p className="fw-bold">$120,300</p>
                        <div className="mb-0">
                          <span className="badge text-success me-2">+1.0%</span>
                          <span className="fw-bold">Since Last Year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-7">
                    <h3 className="fw-bold fs-4 my-3">Supervisors</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr className="highlight">
                          <th scope="col">E.ID</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Branch ID</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1596</th>
                          <td>Mark</td>
                          <td>Oswald</td>
                          <td>BR-266</td>
                          <td>(750)112-5684</td>
                          <td>MarkOs112@gmail.com</td>
                        </tr>
                        <tr>
                          <th scope="row">2066</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>BR-159</td>
                          <td>(201)132-5554</td>
                          <td>JTR@gmail.com</td>
                        </tr>
                        <tr>
                          <th scope="row">3945</th>
                          <td>Larry</td>
                          <td>Jefferson</td>
                          <td>BR-563</td>
                          <td>(780)132-7684</td>
                          <td>LarryJeff227@gmail.com</td>
                        </tr>
                        <tr>
                          <th scope="row">6213</th>
                          <td>Lee</td>
                          <td>Evergreen</td>
                          <td>BR-213</td>
                          <td>(850)212-4381</td>
                          <td>LeeEvergreen112@gmail.com</td>
                        </tr>
                        <tr>
                          <th scope="row">7123</th>
                          <td>Kenny</td>
                          <td>Johanson</td>
                          <td>BR-805</td>
                          <td>(350)120-6783</td>
                          <td>KennyJ750@gmail.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-md-5">
                    <h3 className="fw-bold fs-4 my-3">Reports Overview</h3>
                    <div className="chart-container">
                      <canvas ref={chartRef} id="bar-chart-grouped"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="footer">
            <div className="container-fluid">
              <div className="row text-body-secondary">
                <div className="col-6 text-start">
                  <a href="#" className="text-body-secondary">
                    <strong>Code Trio</strong>
                  </a>
                </div>
                <div className="col-6 text-end text-body-secondary d-none d-md-block">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <a href="#" className="text-body-secondary">Contacts</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-body-secondary">About</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-body-secondary">Terms and Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;