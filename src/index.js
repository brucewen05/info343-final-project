import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import SignInPage from './SignInPage.js';
import SignUpPage from './SignUpPage.js';
import MainPage from './MainPage.js';
import DiscussionsPage from './DiscussionsPage.js';
import DiscussionDetailsPage from './DiscussionDetailsPage.js';
import FAQsPage from './FAQsPage.js';
import FAQDetailsPage from './FAQDetailsPage.js';
import EventsPage from './EventsPage.js';
import EventDetailsPage from './EventDetailsPage.js';


var config = {
    apiKey: "AIzaSyC5kCRuH4inxJadApuiGxSon7E8b0zdLsM",
    authDomain: "info-343-final-project.firebaseapp.com",
    databaseURL: "https://info-343-final-project.firebaseio.com",
    storageBucket: "info-343-final-project.appspot.com",
    messagingSenderId: "907757567327"
  };
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SignInPage} />
      <Route path="join" component={SignUpPage} />
      <Route path="login" component={SignInPage} />
      <Route path="main" component={MainPage} />
      <Route path="discussions" component={DiscussionsPage} />
      <Route path="discussion/:discussionId" component={DiscussionDetailsPage} />
      <Route path="FAQs" component={FAQsPage} />
      <Route path="FAQ/:FAQId" component={FAQDetailsPage} />
      <Route path="events" component={EventsPage} />
      <Route path="event/:eventId" component={EventDetailsPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
