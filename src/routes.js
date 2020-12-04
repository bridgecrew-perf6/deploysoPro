import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/Signin";
import Signout from "./core/Signout";
import About from "./core/About";
import Contact from "./core/Contact";
import Profile from "./core/Profile";
import Create from "./core/Create";
import Feed from "./core/Feed";
import './styles.css';

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} /> 
          <Route path="/profile" exact component={Profile} />
          <Route path="/create" exact component={Create} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signout" exact component={Signout} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;