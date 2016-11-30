import React from 'react';
import {Link} from 'react-router';
import {Grid, Cell, Button, Dialog, DialogContent, DialogActions, DialogTitle, Spinner} from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import {hashHistory} from 'react-router';
import Time from 'react-time';

var data = [
    {
        "ABC":{"username": "u1",
                "userId": 123456,
                "title": "discussion1",
                "createTime": "11/29/2016",
                "editTime": "11/29/2016",
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Smod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod t",
                "likes": 5,
                "dislikes": 2,
                "conversations": {
                    "hash1":{"username": "other1", "userId": 789, "reply": "Lorem ipsum dolor sit amet, consectetur"},
                    "hash2":{"username": "other2", "userId": 987, "reply": "sed do eiusmod tempor incididunt"}
                }
              }             
    },
    {"DEF":{"username": "u2",
                "userId": 654321,
                "title": "discussion2",
                "createTime": "11/27/2016",
                "editTime": "11/28/2016",
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Smod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod t",
                "likes": 3,
                "dislikes": 2,
                "conversations": {
                    "hash1":{"username": "other1", "userId": 789, "reply": "Lorem ipsum dolor sit amet, consectetur"},
                    "hash2":{"username": "other2", "userId": 987, "reply": "sed do eiusmod tempor incididunt"}
                }
              }
    }
];

class DiscussionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {modalOpen:false, title:'', content:'', discussions:[], showSpinner:false};
        this.openModal = this.openModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleContentInputChange = this.handleContentInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Auth state changed: logged in as', user.email);
                this.discussionsRef = firebase.database().ref('discussions');
                this.discussionsRef.on('value', (snapshot) => {
                    var discussionsArray=[];
                    snapshot.forEach((child) => {
                        var obj = {'discussionId': child.key, 'discussionObj': child.val()};
                        discussionsArray.push(obj);
                    });

                    this.setState({discussions:discussionsArray});
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
        if (this.discussionsRef) {
            this.discussionsRef.off();
        }
    }


    openModal() {
        this.setState({modalOpen:true});
    }

    handleCreate(event) {
        event.preventDefault();
        console.log("create!");
        var discussionsRef = firebase.database().ref('discussions');
        var currentUser = firebase.auth().currentUser;
        console.log("currentUser is:" + currentUser.email);
        var objToBePushed={"username": currentUser.displayName,
                            "userId": currentUser.uid,
                            "title": this.state.title,
                            "createTime": firebase.database.ServerValue.TIMESTAMP,
                            "editTime": firebase.database.ServerValue.TIMESTAMP,
                            "content":this.state.content
                          };
        this.setState({showSpinner:true});
        discussionsRef.push(objToBePushed).then(() => {
            this.setState({modalOpen: false, title:'', content:'', showSpinner:false});
        });        
    }

    closeModal(event) {
        event.preventDefault();
        this.setState({modalOpen:false});
    }

    handleTitleInputChange(event) {
        this.setState({title:event.target.value});
    }

    handleContentInputChange(event) {
        this.setState({content:event.target.value});
    }

    render() {
        var result = this.state.discussions.map((discussion) => {
            return (<DiscussionItem key={discussion.discussionId} discussionId={discussion.discussionId} discussionObj={discussion.discussionObj}/>) ;
        });

        var createButtonEnabled = (this.state.title !== '' && this.state.content !== '');

        var spinnerSytle={'display':'none'};
        if (this.state.showSpinner) {
            spinnerSytle={};
        }

        return (
            <Grid>
                <Cell col={12} className="discussion-page-header">
                    <h1>Discussions</h1>
                    <Button raised colored className="create-discussion" onClick={this.openModal}>Create New Discussion</Button>
                </Cell>
                <Cell col={12}>
                    <div className="list-group">
                        {result}
                    </div>
                </Cell>
                <Dialog open={this.state.modalOpen} style={{'width':'100%', 'height':'100%'}} >
                    <DialogTitle>Create a new discussion post</DialogTitle>
                    <DialogContent>
                    {/*need to deal with browser cache later on */}
                        <form>
                            <div className="form-group">
                                <label htmlFor="discussionTitleInput">Title</label> {' '}
                                <input type="text" className="form-control" id="discussionTitleInput" onChange={this.handleTitleInputChange} placeholder="title" value={this.state.title}/>
                            </div>
                            <div className="form-group">
                                <textarea type="text" className="form-control" onChange={this.handleContentInputChange} placeholder="discussion content" value={this.state.content} />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleCreate} colored raised disabled={!createButtonEnabled}><Spinner style={spinnerSytle}/>{' '}Create</Button>
                        <Button type='button' onClick={this.closeModal} colored raised>Discard</Button>
                        {!createButtonEnabled && <div>title or content cannot be empty</div>}
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

class DiscussionItem extends React.Component {
    count(obj) {
        if (obj) {
            return Object.keys(obj).length;
        }
        return 0;
    }
    render() {
        var likes = this.count(this.props.discussionObj.likes);
        var dislikes = this.count(this.props.discussionObj.dislikes);

        return (
            <Link to={"/discussion/" + this.props.discussionId} className="list-group-item list-group-item-action">
                <h1 className="list-group-item-heading">{this.props.discussionObj.title}</h1>
                <p className="list-group-item-text dicussion-content">{this.props.discussionObj.content}</p>
                <br />
                <div className="list-group-item-text">
                    <span>Read more</span>
                    <div></div>
                    <span className="likes"><i className="glyphicon glyphicon-thumbs-up" />{' '}{likes}</span>
                    <span className="dislikes"><i className="glyphicon glyphicon-thumbs-down" />{' '}{dislikes}</span>
                    <div className="discussion-info">
                        <span>created{' '}<Time value={this.props.discussionObj.createTime} relative/></span>
                        {this.props.discussionObj.createTime !== this.props.discussionObj.editTime
                            && <span className="discussion-edit-time">edited{' '}<Time value={this.props.discussionObj.editTime} relative/></span>}
                    </div>
                </div>
            </Link>
        );
    }
}

export default DiscussionPage;