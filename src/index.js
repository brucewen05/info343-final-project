import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var config = {
    apiKey: "AIzaSyC5kCRuH4inxJadApuiGxSon7E8b0zdLsM",
    authDomain: "info-343-final-project.firebaseapp.com",
    databaseURL: "https://info-343-final-project.firebaseio.com",
    storageBucket: "info-343-final-project.appspot.com",
    messagingSenderId: "907757567327"
  };
  firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
