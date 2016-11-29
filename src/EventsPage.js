import React from 'react';
import {Link} from 'react-router';

class EventsPage extends React.Component {
    render() {
        var result = [];
        for (var i = 20; i < 30; i++) {
            result.push(<div key={i}><Link to={"/event/" + i}>{i}</Link></div>)
        }
        return (
            <div>
                {result}
            </div>
        );
    }
}

export default EventsPage;