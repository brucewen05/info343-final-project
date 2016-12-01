import React from 'react';
import {Grid, Cell, IconButton, Dialog, DialogContent, DialogActions, Button} from 'react-mdl';
import {hashHistory} from 'react-router';
import firebase from 'firebase';
import Time from 'react-time';
import 'bootstrap/dist/css/bootstrap.css';

const DELETE_DISCUSSION_THRESHOLD = 3;

class DiscussionDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={username:'',
                    userId:'',
                    title:'',
                    content:'',
                    createTime:'',
                    editTime:'',
                    likes:'',
                    dislikes:'',
                    conversations:[],
                    tooManyDislikesModalOpen:false,
                    deleteConfirmModalOpen:false};

        this.handleTooManyDislikes = this.handleTooManyDislikes.bind(this);
        this.openDeleteConfirmationModal = this.openDeleteConfirmationModal.bind(this);
        this.closeDeleteConfirmationModal = this.closeDeleteConfirmationModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        /* Add a listener and callback for authentication events */
        this.unregister = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('Auth state changed: logged in as', user.email);
                this.detailRef = firebase.database().ref('discussions/' + this.props.params.discussionId);              
                this.detailRef.on('value', (snapshot) => {
                    var obj = {};

                    snapshot.forEach((child) => {
                        if (child.key !== 'conversations' && child.key !== 'likes' && child.key !== 'dislikes') {
                            obj[child.key] = child.val();
                        }
                    });

                    this.setState(obj);
                });

                this.conversationsRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/conversations");
                this.conversationsRef.on('value', (snapshot) => {
                    var conversationsObjArray = [];

                    snapshot.forEach((child) => {
                        var obj = {};
                        obj['key'] = child.key;
                        obj['value'] = child.val();
                        conversationsObjArray.push(obj);
                    });

                    this.setState({conversations: conversationsObjArray}, ()=>{console.log(this.state.conversations)});
                });

                this.likesRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/likes");
                this.likesRef.on('value', (snapshot) => {
                    var likesObjs = {};

                    snapshot.forEach((child) => {
                        likesObjs[child.key] = child.val();
                    });

                    this.setState({likes: likesObjs});
                });

                this.dislikesRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/dislikes");
                this.dislikesRef.on('value', (snapshot) => {
                    var dislikesObjs = {};
                    var count = 0;
                    snapshot.forEach((child) => {
                        dislikesObjs[child.key] = child.val();
                        count++;
                    });

                    if (count >= DELETE_DISCUSSION_THRESHOLD) {
                        firebase.database().ref('discussions/' + this.props.params.discussionId).remove().then(() => {
                            this.setState({tooManyDislikesModalOpen:true});
                        });
                    } else {
                        this.setState({dislikes: dislikesObjs});
                    }
                    
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
        if (this.conversationsRef) {
            this.conversationsRef.off();
        }
        if (this.likesRef) {
            this.likesRef.off();
        }
        if (this.dislikesRef) {
            this.dislikesRef.off();
        }
    }

    handleTooManyDislikes(event) {
        event.preventDefault();
        hashHistory.push("/discussions");
    }

    openDeleteConfirmationModal() {
        this.setState({deleteConfirmModalOpen:true});
    }

    closeDeleteConfirmationModal() {
        this.setState({deleteConfirmModalOpen:false});
    }

    handleDelete(event) {
        event.preventDefault();
        firebase.database().ref('discussions/' + this.props.params.discussionId).remove();
        hashHistory.push("/discussions");
    }

    render() {
        var replies = this.state.conversations.map((conversationObj)=>{
            return <ReplyItem conversationDetails={conversationObj.value} key={conversationObj.key} />
        });

        return (
            <Grid>
                <Cell col={12}>
                    <header>{this.state.title}</header>
                </Cell>
                <Cell col={12}>
                    <ul className="discussion-details-body">
                        <CreatorItem username={this.state.username}
                                     userId={this.state.userId}
                                     content={this.state.content}
                                     createTime={this.state.createTime}
                                     editTime={this.state.editTime}
                                     discussionId={this.props.params.discussionId}
                                     likes={this.state.likes}
                                     dislikes={this.state.dislikes}
                                     deleteCallBack={this.openDeleteConfirmationModal} />
                        {replies}
                    </ul>
                </Cell>
                <Cell col={12}>
                    <ReplyArea discussionId={this.props.params.discussionId} />
                </Cell>
                <Dialog open={this.state.tooManyDislikesModalOpen} >
                    <DialogContent>
                        this discussion got too many dislikes and will be deleted now...
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button' onClick={this.handleTooManyDislikes} raised >take me to main discussion page</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.deleteConfirmModalOpen} >
                    <DialogContent>
                        Are you sure you want to delete this discussion? This cannot be undone!
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleDelete} raised >yes</Button>
                        <Button type='button' onClick={this.closeDeleteConfirmationModal} raised >No!</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        );
    }
}

class ReplyItem extends React.Component {
    constructor(props) {
        super(props);

        var voteObj = this.calculateVotes(props.conversationDetails.votes);
        var state = {};
        state['votes'] = voteObj['count'];
        state['voted'] = voteObj['bool'];

        this.state = state;
    }

    calculateVotes(objs) {
        var count = 0;
        var bool = false;
        if (objs) {
            Object.keys(objs).forEach((key) => {
                var obj = objs[key];
                var userId = obj["userId"];
                var vote = obj["vote"];
                if (userId === firebase.auth().currentUser.uid) {
                    bool = true;
                }
                count += vote;
            });
        }
        return {count: count, bool:bool};
    }

    render() {
        return(
            <li>
                <Grid noSpacing>
                    <Cell col={1}>
                        <div className="votes-container">
                            <div><IconButton name="arrow_drop_up" /></div>
                            <div className="vote-num">{this.state.votes}</div>
                            <div><IconButton name="arrow_drop_down" /></div>
                        </div>
                    </Cell>
                    <Cell col={11}>
                        <div className="reply-container">
                            <div>{this.props.conversationDetails.username}</div>
                            <div className="reply-content"><p>{this.props.conversationDetails.content}</p></div>
                        </div>
                    </Cell>
                    <Cell col={12}>
                        <div className="time-info"><span>posted{' '}<Time value={this.props.conversationDetails.createTime} relative/></span>
                            {this.props.conversationDetails.createTime !== this.props.conversationDetails.editTime
                                && <span className="edit-time">edited{' '}<Time value={this.props.conversationDetails.editTime} relative/></span>}
                        </div>
                    </Cell>
                </Grid>
                <hr />
            </li>
        );
    }
}


class CreatorItem extends React.Component {
    constructor(props) {
        super(props);

        var likeObj = this.calculateLikesAndDislikes(props.likes);
        var dislikeObj = this.calculateLikesAndDislikes(props.dislikes);

        var state = {editMode:false};
        state['likes'] = likeObj['count'];
        state['liked'] = likeObj['bool'];
        state['dislikes'] = dislikeObj['count'];
        state['disliked'] = dislikeObj['bool'];

        this.state = state;

        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    calculateLikesAndDislikes(objs) {
        var count = 0;
        var bool = false;
        if (objs) {
            Object.keys(objs).forEach((key) => {
                count++;
                if (objs[key] === firebase.auth().currentUser.uid) {
                    bool = true;
                }
            });
        }
        return {count: count, bool:bool};
    }

    componentWillReceiveProps(nextProps) {
        var obj = {};
        Object.keys(nextProps).forEach((key) => {
            if (key !== 'likes' && key !== 'dislikes' && this.props[key] !== nextProps[key]) {
                obj = {};
                obj[key] = nextProps[key];
                this.setState(obj);
            } else if (key === 'likes') {
                obj = this.calculateLikesAndDislikes(nextProps[key]);
                this.setState({'likes': obj.count, 'liked':obj.bool});
            } else if (key === 'dislikes') {
                obj = this.calculateLikesAndDislikes(nextProps[key]);
                this.setState({'dislikes': obj.count, 'disliked':obj.bool});
            }
        });

    }

    handleLike(event) {
        event.preventDefault();
        console.log("clicked like!");

        firebase.database().ref('discussions/' + this.props.discussionId + "/likes").push(firebase.auth().currentUser.uid);

        // update the front ui immediately even though
        this.setState({likes:this.state.likes + 1, liked:true});
    }

    handleDislike(event) {
        event.preventDefault();
        console.log("clicked dislike!");

        firebase.database().ref('discussions/' + this.props.discussionId + "/dislikes").push(firebase.auth().currentUser.uid);

        // update the front ui immediately even though
        this.setState({dislikes:this.state.dislikes + 1, disliked:true});
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.deleteCallBack();
    }

    handleEditSubmit(event) {
        event.preventDefault();
        console.log(event.target.editContent.value);
        var updatedContent = event.target.editContent.value;
        if (updatedContent !== this.props.content) {
            var objToBeUpdated = {'content':updatedContent, 'editTime':firebase.database.ServerValue.TIMESTAMP};
            firebase.database().ref('discussions/' + this.props.discussionId).update(objToBeUpdated)
            .then(() => { this.setState({editMode:false}); });
        } else {
            this.setState({editMode:false});
        }
    }

    handleEditClick(event) {
        this.setState({editMode:true});
    }

    handleClose(event) {
        event.preventDefault();
        this.setState({editMode:false});
    }

    render() {
        var likeOrDislikeButtonEnabled = (!this.state.liked && !this.state.disliked);
        var currentUser = firebase.auth().currentUser;
        var editAndDeleteButtonShown = (currentUser !== null ? (currentUser.uid === this.props.userId) : false);
        var content = undefined;
        if (this.state.editMode) {
            // can probably add a spinner to indicating it is updating...
            content = (
                        <form id="discussionEdit" onSubmit={this.handleEditSubmit}>
                            <textarea defaultValue={this.props.content} name="editContent" type="text" className="form-control"></textarea>
                            <Button type="submit">Edit</Button>
                            <Button >Close</Button>
                        </form>  
                       );
        } else {
            content = this.props.content;
        }

        return (
            <li>
                <div>
                    <span>{this.props.username}</span>
                    {editAndDeleteButtonShown && 
                        <div className="discussion-owner-controls">
                            <Button onClick={this.handleEditClick}>edit</Button>
                            <Button onClick={this.handleDelete}>delete</Button>
                        </div>
                    }
                </div>
                <div>{content}</div>
                <div>
                    <span><IconButton name="thumb_up" onClick={this.handleLike} disabled={!likeOrDislikeButtonEnabled} />{' '}{this.state.likes}</span>{' '}
                    <span><IconButton name="thumb_down" onClick={this.handleDislike} disabled={!likeOrDislikeButtonEnabled} />{' '}{this.state.dislikes}</span>
                    <div className="time-info"><span>created{' '}<Time value={this.props.createTime} relative/></span>
                    {this.props.createTime !== this.props.editTime
                        && <span className="edit-time">edited{' '}<Time value={this.props.editTime} relative/></span>}
                    </div>
                </div>
                <hr />
            </li>
        );
    }
}

class ReplyArea extends React.Component {
    constructor(props) {
        super(props);

        this.handleReply = this.handleReply.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state= {replyContent:''};
    }

    handleReply(event) {
        event.preventDefault();
        var replyContent = this.state.replyContent;
        if (replyContent !== '') {
            var currentUser = firebase.auth().currentUser;
            var objToBePushed = {"username":currentUser.displayName,
                                 "userId":currentUser.uid,
                                 "createTime": firebase.database.ServerValue.TIMESTAMP,
                                 "editTime": firebase.database.ServerValue.TIMESTAMP,
                                 "content": replyContent};

            firebase.database().ref('discussions/' + this.props.discussionId + "/conversations").push(objToBePushed)
            .then(() => {
                this.setState({replyContent:''});
            });
        }

    }

    handleInputChange(event) {
        console.log(event.target.value);
        this.setState({replyContent: event.target.value});
    }

    render() {
        return (
            <div>
                <form id="replyForm" onSubmit={this.handleReply}>
                    <textarea className="form-control" name="replyArea" onChange={this.handleInputChange} value={this.state.replyContent}></textarea>
                    <Button>Reply</Button>
                </form>
            </div>
        );
    }
}

export default DiscussionDetailsPage;