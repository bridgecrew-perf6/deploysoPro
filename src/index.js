import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes"
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAw6AIWeu3idwiQSN686vKSlwPVBTYUnU0",
  authDomain: "blogtalk-690cc.firebaseapp.com",
  databaseURL: "https://blogtalk-690cc.firebaseio.com",
  projectId: "blogtalk-690cc",
  storageBucket: "blogtalk-690cc.appspot.com",
  messagingSenderId: "1092152175272",
  appId: "1:1092152175272:web:a8651b3ec48ce52b95f09d",
  measurementId: "G-EZ57144P03"
});

ReactDOM.render(
    <Routes />,
  document.getElementById('root')
);
