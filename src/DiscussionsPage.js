import React from 'react';
import {Link} from 'react-router';

class DiscussionPage extends React.Component {
    render() {
        var result = [];
        for (var i = 0; i < 10; i++) {
            result.push(<div key={i}><Link to={"/discussion/" + i}>{i}</Link></div>)
        }
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default DiscussionPage;