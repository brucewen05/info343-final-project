import React from 'react';
import { Grid, Cell } from 'react-mdl';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';
import homebanner from './img/homebanner.jpg';

class MainPage extends React.Component {
    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Auth state changed: logged in as', user.email);
            }
            else {
                console.log('Auth state changed: logged out');
                hashHistory.push("/login");
            }
        });
    }

    componentWillUnmount() {
        if (this.unregister) {
            this.unregister();
        }
    }

    render() {
        return (
            <Grid id="home-content">
                <Cell col={12} >
                    <img className="banner" src={homebanner} role="presentation" />
                </Cell>
                <Cell col={12}>
                    <h2>About Us</h2>
                    <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                    <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                </Cell>
                <Cell col={4}>
                    <Link to="/discussions" className="list-group-item">
                        <div className="page-desc-heading">
                            <i className="material-icons">question_answer</i>
                            <h2>Discussions</h2>
                        </div>
                        <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                    </Link>
                </Cell>
                <Cell col={4}>
                    <Link to="/FAQs" className="list-group-item">
                        <div className="page-desc-heading">
                            <i className="material-icons">live_help</i>
                            <h2>FAQ</h2>
                        </div>
                        <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                    </Link>
                </Cell>
                <Cell col={4}>
                    <Link to="/events" className="list-group-item">
                        <div className="page-desc-heading">
                            <i className="material-icons">event</i>
                            <h2>Events</h2>
                        </div>
                        <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                    </Link>
                </Cell>
            </Grid>
        );
    }
}

export default MainPage;