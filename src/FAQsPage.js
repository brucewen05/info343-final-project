import React from 'react';
import {Link} from 'react-router';

// class FAQsPage extends React.Component {
//     render() {
//         var result = [];
//         for (var i = 10; i < 20; i++) {
//             result.push(<div key={i}><Link to={"/FAQ/" + i}>{i}</Link></div>)
//         }
//         return (
//             <div>
//                 {result}
//             </div>
//         );
//     }
// }

class FAQsPage extends React.Component {
  render() {
    return(
      <div className="container">
      <h1>FAQ</h1>
      <div className="list-group-item FAQ-container">
          <h2 className="list-group-item-heading">Q: Question</h2>
          <hr />
          <p className="list-group-item-text event-description">
              A: Answer
          </p>
          <br />
      </div>
      <div className="list-group-item FAQ-container">
          <h2 className="list-group-item-heading">Q: Question</h2>
          <hr />
          <p className="list-group-item-text event-description">
              A: Answer
          </p>
          <br />
      </div>
      <div className="list-group-item FAQ-container">
          <h2 className="list-group-item-heading">Q: Question</h2>
          <hr />
          <p className="list-group-item-text event-description">
              A: Answer
          </p>
          <br />
      </div>
      </div>
    )
  }
}

export default FAQsPage;
