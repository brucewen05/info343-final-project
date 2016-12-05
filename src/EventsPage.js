import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Grid, Cell, Header, Button } from 'react-mdl';
import firebase from 'firebase';
import moment from 'moment';


class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }
    componentDidMount() {
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                hashHistory.push("/login");
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Events</h1>
                <Grid>

                    <NewEvent />
                    <EventsList />

                </Grid>
            </div>
        );
    }
}

class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", date: "", time: "", location: "", description: "" };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    //handles title input
    handleInputChange(event, field) {
        this.setState({ [field]: event.target.value });
    }

    handlePostEvent(event) {
        event.preventDefault();
        var user = firebase.auth().currentUser;
        var eventsRef = firebase.database().ref("events");
        //data about the event to store
        var eventData = {
            userId: user.uid,
            displayName: user.displayName,
            title: this.state.title,
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            description: this.state.description,
            postTime: firebase.database.ServerValue.TIMESTAMP
        }
        this.setState({
            title: "",
            date: "",
            time: "",
            location: "",
            description: ""
        });
        eventsRef.push(eventData);
    }

    render() {
        return (
            <Cell col={12} className="list-group-item">
                <h2>Add a new event</h2>
                <form>
                    <input type="text" className="form-control" value={this.state.title} onChange={(event) => this.handleInputChange(event, "title")} placeholder="Title" /> <br />
                    <input type="text" className="form-control" value={this.state.date} onChange={(event) => this.handleInputChange(event, "date")} placeholder="Date" /> <br />
                    <input type="text" className="form-control" value={this.state.time} onChange={(event) => this.handleInputChange(event, "time")} placeholder="Time" /> <br />
                    <input type="text" className="form-control" value={this.state.location} onChange={(event) => this.handleInputChange(event, "location")} placeholder="Location" /> <br />
                    <textarea type="text" className="form-control" value={this.state.description} onChange={(event) => this.handleInputChange(event, "description")} placeholder="Event description" /> <br />
                </form>
                <Button type="button" onClick={(event) => this.handlePostEvent(event)} aria-label="post event" colored raised>Post Event</Button>
            </Cell>
        );
    }
}

class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentWillMount() {
        var eventsRef = firebase.database().ref('events').orderByChild('time');
        eventsRef.on('value', (snapshot) => {
            var eventsArray = [];
            snapshot.forEach(function (child) {
                var event = child.val();
                event.key = child.key;
                eventsArray.push(event);
            });
            //updates list
            this.setState({ events: eventsArray });
        });
        //listens for changes to user obj in database and stores in state
        var usersRef = firebase.database().ref('users');
        usersRef.on('value', (snapshot) => {
            this.setState({ users: snapshot.val() });
        });
    }

    componentWillUnmount() {
        //unregister user and message listeners
        firebase.database().ref('users').off();
        firebase.database.ref('events').off
    }

    render() {
        var eventItems = this.state.events.map((event) => {
            return <EventItem event={event} eventId={event.key} key={event.key} />
        })

        return (
            <Cell col={12}>
                {eventItems}
            </Cell>
        );
    }
}


class EventItem extends React.Component {
    render() {
        return (
            <Link to={"/event/" + this.props.eventId} className="list-group-item">
                <h2 className="list-group-item-heading">{this.props.event.title}</h2>
                <p>Date: {this.props.event.date}</p>
                <p>Time: {this.props.event.time}</p>
                <p>Location: {this.props.event.location}</p>
                <hr />
                <p className="list-group-item-text event-description">
                    {this.props.event.description}
                </p>
                <br />
                <p>Event created {moment(this.props.event.postTime).fromNow()} by {this.props.event.displayName}</p>
            </Link>
        );
    }
}

export default EventsPage;