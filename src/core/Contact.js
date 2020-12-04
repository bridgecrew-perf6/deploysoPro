import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer"

function Contact(){
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    let saveFile = () => {
      
      // This variable stores all the data.
      let data = 
          '\r Name: ' + name + ' \r\n ' + 
          'Email: ' +email + ' \r\n ' + 
          'Message: ' + message + ' \r\n ';
      
      // Convert the text to BLOB.
      const textToBLOB = new Blob([data], { type: 'text/plain' });
      const sFileName = 'formData.txt';	   // The file to save the data.

      let newLink = document.createElement("a");
      newLink.download = sFileName;

      if (window.webkitURL != null) {
          newLink.href = window.webkitURL.createObjectURL(textToBLOB);
      }
      else {
          newLink.href = window.URL.createObjectURL(textToBLOB);
          newLink.style.display = "none";
          document.body.appendChild(newLink);
      }

      newLink.click(); 
  }

    function handleChange(event){
      const target = event.target;
      const name = target.name;
      console.log(name);
      if(name==="inputName"){
        setName(target.value);
      }
      else if(name==="inputEmail"){
        setEmail(target.value);
      }
      else if(name==="inputMessage"){
        setMessage(target.value);
      }
    }
    return(
        <div>
        <Navbar />
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-5"> So<span className="text-success">P</span>
          <span className="text-warning">R</span>
          <span className="text-danger">O</span></h1>
        </div>
        <div className="container">
            <h4 className="text-center">Contact Us</h4>
            <div className="container-md p-3 form">
      <form className="form-signin">
        <div className="form-label-group">
          <input
            type="text"
            id="inputName"
            name="inputName"
            className="form-control"
            required=""
            placeholder="Your Name"
            value = {name}
            onChange={handleChange}
          />
          <label htmlFor="inputName">Your Name</label>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            name="inputEmail"
            className="form-control"
            required=""
            placeholder="Your Email"
            value = {email}
            onChange={handleChange}
          />
          <label htmlFor="inputEmail">Your Email</label>
        </div>
        <div className="form-label-group">
          <textarea
            id="inputMessage"
            className="form-control"
            name="inputMessage"
            required=""
            placeholder="Your Message"
            value = {message}
            onChange={handleChange}
          />
          <label htmlFor="message">Your Message</label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" onClick={saveFile}>
          Send
        </button>
      </form>
      </div>
        </div>
        {/* <Footer /> */}
        </div>
    );
}

export default Contact;