import React from 'react';
import {Link} from 'react-router';

class News extends React.Component {
  render() {
    return (
      <div>
      <h1>NEWS</h1>
      <iframe src="http://www.politico.com/news/immigration"
        height="700px"
  			width="70%">
  		</iframe>
      </div>
    )
  }
}

export default News;
