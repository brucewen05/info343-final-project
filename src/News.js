import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

class News extends React.Component {
      constructor(props) {
          super(props);
          this.state = {news: undefined}
          this.fetchData = this.fetchData.bind(this);
      }
      fetchData() {
        var thisComponent = this;
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var newUrl = url + '?' + $.param({
          'api-key': "57dc3b4f1c5a432fa6979797629a230f",
          'q': "immigration"
        });
        fetch(newUrl)
        .then(function(response) {
                var newPromise = response.json();
                console.log(response)
                return newPromise;
        })
            .then(function(data) {
                console.log(data);
                thisComponent.setState({news: data.response})
            });
      }



      componentDidMount() {
        this.fetchData();
      }

    render() {
      var content = null;
      if (this.state.news) {
        content = <Stories storiesObj={this.state.news}/>;
      }

      return (
        <div>
        <h1>NEWS</h1>
        {content}
        </div>
      )
  }
}

//component UpcomingLaunches is the container for all of the launch cards
class Stories extends React.Component {
  render () {
    var news = this.props.storiesObj.docs;
    console.log(news);
     var StoryCardArray=news.map(function(story) {
       return <StoryCard story={story} key={story.web_url}/>
     });
    return (
      <div>
      <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
      </div>
      <div className="container">
        {StoryCardArray}
      </div>
      </div>
    );
  }
}

//component LaunchCard takes all the different launches and creates a "card" of information for each launch
class StoryCard extends React.Component {
  render() {
    //  var news = this.props.stories.docs;
    //  console.log(news);
    return (
      <div>
      <ul className="demo-list-item mdl-list">
          <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">
            <div className="card-wide mdl-card mdl-shadow--2dp">
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">{this.props.story.headline.main}</h2>
              </div>
              <div className="mdl-card__supporting-text">
              {this.props.story.pub_date}
              </div>
              <div className="mdl-card__actions mdl-card--border">
              <div className="mdl-card__supporting-text">
              {this.props.story.snippet}
              </div>
              </div>
            </div>
          </span>
        </li>
      </ul>
      </div>
    );
  }
}
export default News;
