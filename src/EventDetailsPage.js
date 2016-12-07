import React from 'react';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import moment from 'moment';

class EventDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            displayName: '',
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            postTime: ''
        };
    }

    componentDidMount() {
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.eventDetailsRef = firebase.database().ref('events/' + this.props.params.eventId);
                this.eventDetailsRef.on('value', (snapshot) => {
                    var eventObj = {};
                    snapshot.forEach((child) => {
                        eventObj[child.key] = child.val();
                    });
                    this.setState(eventObj);
                });
            }
            else {
                hashHistory.push("/login");
            }
        });
    }

    componentWillUnmount() {
        if (this.eventDetailsRef) {
            this.eventDetailsRef.off();
        }
        if (this.unregister) {
            this.unregister();
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <h1>{this.state.title}</h1>
                        <div className="list-group-item">
                            <p><span className="event-info">Date</span>: {this.state.date}</p>
                            <p><span className="event-info">Time</span>: {this.state.time}</p>
                            <p><span className="event-info">Location</span>: {this.state.location}</p>
                            <hr />
                            <p className="list-group-item-text">
                                {this.state.description}
                            </p>
                            <br />
                            <p>Event created <span className="event-info">{moment(this.state.postTime).fromNow()}</span> by <span className="event-info">{this.state.displayName}</span></p>
                        </div>
                        <div>
                            <Link to={"/events"}>Back to all events</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetailsPage;