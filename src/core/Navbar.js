import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">So<span className="text-success">P</span><span className="text-warning">R</span><span className="text-danger">O</span></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          {(window.localStorage.getItem("userEmail")!="") && <Link className="btn btn-outline-primary my-2 my-sm-0 mx-2 text-white" to="/create">Create a Post</Link>}
          {(window.localStorage.getItem("userEmail")!="") && <Link className="btn btn-outline-primary my-2 my-sm-0 mx-2 text-white" to="/feed">Feed</Link>}
          {(window.localStorage.getItem("userEmail")!="") && <Link className="btn btn-outline-primary my-2 my-sm-0 mx-2 text-white" to="/profile">My Profile</Link>}
            {(window.localStorage.getItem("userEmail")=="") && <Link className="btn btn-outline-success my-2 my-sm-0 mx-2" to="/signup">Sign Up</Link>}
            {(window.localStorage.getItem("userEmail")=="") && <Link className="btn btn-outline-warning my-2 my-sm-0 mx-2" to="/signin">Sign In</Link>}
            {(window.localStorage.getItem("userEmail")!="") && <Link className="btn btn-outline-danger my-2 my-sm-0 mx-2" to="/signout">Sign Out</Link>}
        </div>
      </nav>
    );
}

export default Navbar;