import React from 'react';
import {Grid, Cell} from 'react-mdl';
import {hashHistory} from 'react-router';
import firebase from 'firebase';

class DiscussionDetailsPage extends React.Component {
    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Auth state changed: logged in as', user.email);
                this.detailRef = firebase.database().ref('discussions/' + this.props.params.discussionId);
                this.detailRef.on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        console.log(child.key);
                        console.log(child.val());
                    });
                });
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
        if (this.detailRef) {
            this.detailRef.off();
        }
    }

    render() {
        return (
            <div>
                Inside DiscussionDetailsPage with discussionId: {this.props.params.discussionId}
            </div>
        );
    }
}

class CreatorItem extends React.Component {
    render() {

    }
}

export default DiscussionDetailsPage;