import React from 'react';
import {Link} from 'react-router';

class FAQsPage extends React.Component {
    render() {
        var result = [];
        for (var i = 10; i < 20; i++) {
            result.push(<div key={i}><Link to={"/FAQ/" + i}>{i}</Link></div>)
        }
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default FAQsPage;