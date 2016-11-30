import React from 'react';
import {Grid, Cell, IconButton} from 'react-mdl';
import {hashHistory} from 'react-router';
import firebase from 'firebase';
import Time from 'react-time';

class DiscussionDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state={username:'', userId:'', title:'', content:'', createTime:'', editTime:'', likes:'', dislikes:'', conversations:''};
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
                        obj[child.key] = child.val();
                    });

                    this.setState(obj);
                });

                this.conversationsRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/conversations");
                this.conversationsRef.on('value', (snapshot) => {
                    var conversationsObjArray = [];

                    snapshot.forEach((child) => {
                        var obj = {};
                        obj[child.key] = child.val();
                        conversationsObjArray.push(obj);
                    });

                    this.setState({conversations: conversationsObjArray}, ()=>{console.log("after received new conversations"); console.log(this.state)});
                });

                this.likesRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/likes");
                this.likesRef.on('value', (snapshot) => {
                    var likesObjArray = [];

                    snapshot.forEach((child) => {
                        var obj = {};
                        obj[child.key] = child.val();
                        likesObjArray.push(obj);
                    });

                    this.setState({likes: likesObjArray}, ()=>{console.log("after received new likes"); console.log(this.state)});
                });

                this.dislikesRef = firebase.database().ref('discussions/' + this.props.params.discussionId + "/dislikes");
                this.dislikesRef.on('value', (snapshot) => {
                    var dislikesObjArray = [];

                    snapshot.forEach((child) => {
                        var obj = {};
                        obj[child.key] = child.val();
                        dislikesObjArray.push(obj);
                    });

                    this.setState({dislikes: dislikesObjArray}, ()=>{console.log("after received new dislikes"); console.log(this.state)});
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

    render() {
        console.log("re-render the detail page, likes is:");
        console.log(this.state.likes);
        return (
            <Grid>
                <Cell col={12}>
                    <header>{this.state.title}</header>
                </Cell>
                <Cell col={12}>
                    <ul>
                        <CreatorItem username={this.state.username} content={this.state.content} createTime={this.state.createTime} editTime={this.state.editTime} discussionId={this.props.params.discussionId} likes={this.state.likes} dislikes={this.state.dislikes}/>
                    </ul>
                </Cell>

            </Grid>
        );
    }
}

class CreatorItem extends React.Component {
    constructor(props) {
        super(props);

        var likeObj = this.calculateLikesAndDislikes(props.likes);
        var dislikeObj = this.calculateLikesAndDislikes(props.dislikes);

        var state = {};
        state['likes'] = likeObj['count'];
        state['liked'] = likeObj['bool'];
        state['dislikes'] = dislikeObj['count'];
        state['disliked'] = dislikeObj['bool'];

        this.state = state;

        console.log("in the constructor");
        console.log(this.state);

        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
    }

    calculateLikesAndDislikes(objs) {
        var count = 0;
        var bool = false;
        console.log(objs);
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
        console.log("received new props");
        console.log(nextProps);
        Object.keys(nextProps).forEach((key) => {
            if (this.props[key] !== nextProps[key]) {
                var obj = {};
                obj[key] = nextProps[key];
                //if (key === 'likes') {console.log("likes!"); console.log(obj)}
                //this.setState(obj);
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

    render() {
        var likeOrDislikeButtonEnabled = (!this.state.liked && !this.state.disliked);

        return (
            <li>
                <div>{this.props.username}</div>
                <div>{this.props.content}</div>
                <div>
                    <span><IconButton name="thumb_up" onClick={this.handleLike} disabled={!likeOrDislikeButtonEnabled} />{' '}{this.state.likes}</span>{' '}
                    <span><IconButton name="thumb_down" onClick={this.handleDislike} disabled={!likeOrDislikeButtonEnabled} />{' '}{this.state.dislikes}</span>
                    <span>created{' '}<Time value={this.props.createTime} relative/></span>
                    {this.props.createTime !== this.props.editTime
                            && <span>edited{' '}<Time value={this.props.editTime} relative/></span>}
                </div>
            </li>
        );
    }
}

export default DiscussionDetailsPage;