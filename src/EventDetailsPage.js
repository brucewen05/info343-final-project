import React from 'react';

class EventDetailsPage extends React.Component {
    render() {
        return (
            <div>
                Inside EventDetailsPage with eventId: {this.props.params.eventId}
            </div>
        );
    }
}

export default EventDetailsPage;