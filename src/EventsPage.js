import React from 'react';
import { Link } from 'react-router';
import { Grid, Cell, Header, Button } from 'react-mdl';


class EventsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    //handles title input
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    //handles date input
    handleDateChange(event) {
        this.setState({date: event.target.value});
    }

    //handles time input
    handleTimeChange(event) {
        this.setState({time: event.target.value});
    }

    //handles location input
    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    //handles description input
    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }


    render() {
        var result = [];
        for (var i = 20; i < 30; i++) {
            result.push(<EventsItem eventId={i} key={i} />);
        }
        return (
            <div>
                <Header title="Events" />
                <Grid>
                    <div className="list-group">
                        <Cell col={12} className="list-group-item">
                            <h2>Add a new event</h2>
                            <form>
                                <input type="text" className="form-control" onChange={this.handleTitleChange} placeholder="Title" /> <br />
                                <input type="text" className="form-control" onChange={this.handleDateChange} placeholder="Date" /> <br />
                                <input type="text" className="form-control" onChange={this.handleTimeChange} placeholder="Time" /> <br />
                                <input type="text" className="form-control" onChange={this.handleLocationChange} placeholder="Location" /> <br />
                                <textarea type="text" className="form-control" onChange={this.handleDescriptionChange} placeholder="Event description" /> <br />
                            </form>
                            <Button type="button" colored raised>Post Event</Button>
                        </Cell>
                        {result}
                    </div>
                </Grid>
            </div>
        );
    }
}

class EventsItem extends React.Component {
    render() {
        return (
            <Cell col={12}>
                <Link to={"/event/" + this.props.eventId} className="list-group-item" >
                    <h2 className="list-group-item-heading">Event Title {this.props.eventId} </h2>
                    <p>Date: MM/DD/YY</p>
                    <p>Time: HH:MM</p>
                    <p>Location: Lorem ipsum</p>
                    <hr />
                    <p className="list-group-item-text">
                        Et sint sunt consequat labore officia. Aliquip consectetur cillum non qui do adipisicing labore consectetur. Commodo sit id commodo consectetur mollit reprehenderit amet mollit qui sint. Dolor aute eu consequat ex ad amet excepteur nostrud occaecat id culpa elit dolore. Labore mollit do esse sit veniam adipisicing elit cupidatat dolor.
                </p>
                    <br />
                    <p>Event created MM/DD/YY by XXXXXXX</p>

                </Link>
            </Cell>
        );
    }
}

export default EventsPage;