import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="hero-bg px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">So<span className="text-success">P</span><span className="text-warning">R</span><span className="text-danger">O</span></h1>
        <div className="container mt-5">
        <div className="typewriter d-lg-block d-none">
          <h1>Place where <b>Programmers</b> meet.</h1>
        </div>
        </div>
        <div className="container mt-5 hero-txt">
            <h4>With an idea in mind, implementation should never stop.<br />Here at <b>SoPRO</b> thousands of programmers are ready to help you on your way to implement your idea and bring it into reality!</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
