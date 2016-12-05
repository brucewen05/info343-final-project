import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

class News extends React.Component {
      constructor(props) {
          super(props);
          this.state = {news: []}
          this.fetchData = this.fetchData.bind(this);
      }

      fetchData() {
        var thisComponent = this;
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "57dc3b4f1c5a432fa6979797629a230f",
          'q': "immigration"
        });
        fetch(url)
        .then(function(response) {
                var newPromise = response.json();
                console.log(response)
                return newPromise;
        })
            .then(function(data) {
                console.log(data);
                thisComponent.setState({news: data})
            });
      }
    render() {
      console.log(this.state);

    return (
      <div>
      <h1>NEWS</h1>

      </div>
    )
  }
}

export default News;
