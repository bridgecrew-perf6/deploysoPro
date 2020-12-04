import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return (
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <Link className="btn btn-warning btn-lg" to="/contact">Contact Us</Link>
      </div>
      <div className="container">
        <span className="text-muted">
          Copyright SoPRO 2020 
        </span>
        <span className="text-muted ml-5">
          An Amazing <span className="text-white">Programmers</span> Place
        </span>
      </div>
    </footer>
    );
}

export default Footer;