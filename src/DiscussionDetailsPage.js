import React from 'react';

class DiscussionDetailsPage extends React.Component {
    render() {
        return (
            <div>
                Inside DiscussionDetailsPage with discussionId: {this.props.params.discussionId}
            </div>
        );
    }
}

export default DiscussionDetailsPage;