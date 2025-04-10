import React from 'react';
import './style.css';

function CreateEmployee() {
  return (
  <>
    <div className="sidebar">

        <div className="logo"></div>
        <ul className="menu">
            
            <li>
                <a href="#">
                    <i className="fa-solid fa-gauge"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className="active">
                <a href="#">
                    <i className="fa-solid fa-user"></i>
                    <span>Create Employee</span>
                </a>
            </li>

            <li>
                <a href="#">
                    <i className="fa-solid fa-store"></i>
                    <span>Create Branch</span>
                </a>
            </li>

            <li>
                <a href="#">
                    <i className="fa-solid fa-clipboard"></i>
                    <span>Sales Backlog</span>
                </a>
            </li>

            <li>
                <a href="#">
                    <i className="fa-solid fa-gear"></i>
                    <span>Settings</span>
                </a>
            </li>

            <li className="logout">
                <a href="#">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </a>
            </li>






        </ul>
    </div>



<div className="main--content">
    <div className="header--wrapper">
        <div className="header--title">
            <span>Primary</span>
            <h2>Create Employee</h2>
        </div>
        <p>Admin ID:0001</p>
    </div> 

<div className="card--container">
    <h3 className="main--title">Create New Employee</h3>

    <section className="p-3">

        <div className="row">
            <div className="col-12">
                <button className="btn btn-primary newUser" data-bs-toggle="modal" data-bs-target="#userForm">New Employee <i className="bi bi-people"></i></button>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <table className="table table-striped table-hover mt-3 text-center table-bordered">
                    <thead>
                        <tr>
                            <th>E.ID</th>
                            <th>Picture</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>BranchID</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody id="data">
                       
                    </tbody>

                </table>
            </div>
        </div>


    </section>


</div>






</div>



<div className="modal fade" id="userForm">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Fill the Form</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
            </div>

            <div className="modal-body">

                <form action="#" id="myForm">

                    <div className="card imgholder">
                        <label for="imgInput" className="upload">
                            <input type="file" name="" id="imgInput" />
                         <i className="bi bi-plus-circle-dotted"></i>   
                        </label>
                        <img src="./images/proficon.jpg" alt="proficon" width="200" height="200" id="imgEmp" />
                    </div>

                    <div className="inputField">
                        <div>
                            <label for="fname">First name:</label>
                            <input type="text" name="" id="fname" required />
                        </div>
                        <div>
                            <label for="lname">Last name:</label>
                            <input type="text" name="" id="lname" required />
                        </div>
                        <div>
                            <label for="branchid">BranchID:</label>
                            <input type="text" name="" id="BID" required />
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" name="" id="email" required />
                        </div>
                        <div>
                            <label for="phone">Phone:</label>
                            <input type="text" name="" id="phone" minlength="10" maxlength="10" required />
                        </div>
                        <div>
                            <label for="status">Status:</label>
                            <input type="text" name="" id="status" required />
                        </div>

                    </div>




                </form>

            </div>

            <div className="modal-footer">
                <button type="submit" form="myForm" className="btn btn-primary submit">Submit</button>
            </div>




        </div>
    </div>


</div>

<div className="modal fade" id="readData">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Profile</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close"></button>
            </div>

            <div className="modal-body">

                <form action="#" id="myForm">

                    <div className="card imgholder">
                        <img src="./images/proficon.jpg" alt="proficon" width="200" height="200" className="showImg" />
                    </div>

                    <div className="inputField">
                        <div>
                            <label for="fname">First name:</label>
                            <input type="text" name="" id="showfname" disabled />
                        </div>
                        <div>
                            <label for="lname">Last name:</label>
                            <input type="text" name="" id="showlname" disabled />
                        </div>
                        <div>
                            <label for="branchid">BranchID:</label>
                            <input type="text" name="" id="showBID" disabled />
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" name="" id="showEmail" disabled />
                        </div>
                        <div>
                            <label for="phone">Phone:</label>
                            <input type="text" name="" id="showPhone" minlength="10" maxlength="10" disabled />
                        </div>
                        <div>
                            <label for="status">Status:</label>
                            <input type="text" name="" id="showStatus" disabled />
                        </div>

                    </div>




                </form>

            </div>


        </div>
    </div>


</div>

  </> 
  )
}

export default CreateEmployee