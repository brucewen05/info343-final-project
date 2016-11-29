import React from 'react';

class FAQDetailsPage extends React.Component {
    render() {
        return (
            <div>
                Inside FAQDetailsPage with FAQId: {this.props.params.FAQId}
            </div>
        );
    }
}

export default FAQDetailsPage;