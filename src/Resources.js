import React from 'react';
import {Link} from 'react-router';
import alyssa from './img/alyssa.jpg';
import bruce from './img/bruce.jpg';
import amy from './img/amy.jpg';
import 'bootstrap/dist/css/bootstrap.css';

class About extends React.Component {
  render() {
    return (
      <div>
      <div className="header-cont">
        <header className="main-header resources-header">
        <div className="header-text">
        <h1 className="header-title">Resources</h1>
        <p className="header-desc">Where to go now</p>
        </div>
        </header>
        </div>
      <div className="container">
        <ul id="resources-list">
        <li><a href="https://iss.washington.edu/">UW International Student Services (ISS)</a></li>
        <p>blurb</p>
        <li><a href="https://uws-community.symplicity.com/?s=student_group">UW Registered Student Organizations (RSOs)</a></li>
        <p>blurb</p>
        <li><a href="http://www.seattle.gov/">Seattle Government</a></li>
        <p>blurb</p>
        <li><a href="http://www.house.gov/representatives/find/">Find your local representaive</a></li>
        <p>blurb</p>
        </ul>
      </div>
      </div>
    )
  }
}

export default About;
