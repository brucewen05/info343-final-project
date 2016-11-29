import React from 'react';
import {Grid, Cell} from 'react-mdl';
import {Link, hashHistory} from 'react-router';
import firebase from 'firebase';

class MainPage extends React.Component {
    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Auth state changed: logged in as', user.email);
            }
            else{
                console.log('Auth state changed: logged out');
                hashHistory.push("/login");
            }
        });
    }

    componentWillUnmount() {
        if(this.unregister) {
            this.unregister();
        }
    }

    render() {
        return (
            <Grid>
                <Cell col={6}><Link to="/discussions">To discussion board</Link></Cell>
                <Cell col={6}><Link to="/FAQs">To FAQs</Link></Cell>
                <Cell col={6}><Link to="/events">To events</Link></Cell>
            </Grid>
        );
    }
}

export default MainPage;