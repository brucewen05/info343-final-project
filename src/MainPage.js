import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import homebanner from './img/homebanner.jpg';
import Time from 'react-time';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {'discussions': null};
    }
    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Auth state changed: logged in as', user.email);
            }
            else {
                console.log('Auth state changed: logged out');
            }
        });

        this.discussionRef = firebase.database().ref('discussions');
        this.discussionRef.on('value', (snapshot)=>{
            var discussionsArray = [];
            snapshot.forEach((child) => {
                var obj = {'key': child.key, 'value': child.val()};
                discussionsArray.push(obj);
            });
            this.setState({'discussions': discussionsArray});
        });
    }

    componentWillUnmount() {
        if (this.discussionRef) {
            this.discussionRef.off();
        }
        if (this.unregister) {
            this.unregister();
        }
    }

    render() {
        var discussionContent = undefined;
        if (this.state.discussions) {
            var discussions = this.state.discussions.map((discussion) => {
                return (<DiscussionItem key={discussion.key} discussion={discussion.value}/>);
            });
            discussionContent = (<div className="main-page-discussion">
                                    <h1>Popular discussions:</h1>
                                    <ul>
                                        {discussions}
                                    </ul>
                                </div>);
        } else {
            discussionContent = (<div className="main-page-discussion">There are no discussions currently. Create your first one!</div>)
        }

        return (
            <div className="container" id="home-content">
                <div className="row">
                    <div className="col-xs-12">
                        <img className="banner" src={homebanner} role="presentation" />
                    </div>
                    <div className="col-xs-12">
                        <h2>About Us</h2>
                        <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                        <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                    </div>

                    <div className="col-xs-12 col-md-4 main-page-card">
                        <Link to="/discussions" className="list-group-item">
                            <div className="page-desc-heading">
                                <i className="material-icons">question_answer</i>
                                <h2>Discussions</h2>
                            </div>
                            {discussionContent}
                        </Link>
                    </div>

                    <div className="col-xs-12 col-md-4 main-page-card">
                        <Link to="/news" className="list-group-item">
                            <div className="page-desc-heading">
                                <i className="material-icons">picture_in_picture</i>
                                <h2>News</h2>
                            </div>
                            <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                        </Link>
                    </div>

                    <div className="col-xs-12 col-md-4 main-page-card">
                        <Link to="/events" className="list-group-item">
                            <div className="page-desc-heading">
                                <i className="material-icons">event</i>
                                <h2>Events</h2>
                            </div>
                            <p>Dolor nostrud mollit mollit et tempor do. Occaecat officia culpa mollit ad id magna ullamco aliqua nostrud aliquip sit in anim pariatur. Culpa culpa commodo nulla id aute sint. Laboris in velit Lorem minim quis cillum sit ea dolor aliqua cupidatat exercitation. Nulla nulla nulla nisi reprehenderit quis Lorem et aliqua excepteur voluptate labore aute. Duis irure ex culpa nisi nostrud cillum id ex ea incididunt. Nisi aliquip ullamco amet minim adipisicing aliquip excepteur amet occaecat ea ex non cillum cillum.</p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

class DiscussionItem extends React.Component {
    render() {
        return (
            <li>
                <div className="main-page-discussion-title">{this.props.discussion.title}
                </div>
                <div className="main-page-post-time">posted{' '}<Time value={this.props.discussion.createTime} relative/>
                </div>
            </li>
        );
    }
}

export default MainPage;