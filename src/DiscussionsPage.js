import React from 'react';
import {Link} from 'react-router';
import {Grid, Cell, Button, Dialog, DialogContent, DialogActions, DialogTitle} from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.css';

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

        this.state = {modalOpen:false, title:'', content:''};
        this.openModal = this.openModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleContentInputChange = this.handleContentInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    openModal() {
        this.setState({modalOpen:true});
    }

    handleCreate(event) {
        event.preventDefault();
        console.log("create!");
        this.setState({modalOpen: false, title:'', content:''})
        
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
        var result = data.map((conv) => {
            var obj = {};
            Object.keys(conv).forEach((key) =>{
                obj["discussionId"] = key;
                obj["discussionObj"] = conv[key];
            });

            return (<DiscussionItem key={obj.discussionId} discussionId={obj.discussionId} discussionObj={obj.discussionObj}/>) ;
        });

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
                                <input type="text" className="form-control" id="discussionTitleInput" onChange={this.handleTitleInputChange} placeholder="title" />
                            </div>
                            <div className="form-group">
                                <textarea type="text" className="form-control" onChange={this.handleContentInputChange} placeholder="what to discuss" />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleCreate} colored raised>Create</Button>
                        <Button type='button' onClick={this.closeModal} colored raised>Discard</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}

class DiscussionItem extends React.Component {
    render() {
        return (
            <Link to={"/discussion/" + this.props.discussionId} className="list-group-item list-group-item-action">
                <h1 className="list-group-item-heading">{this.props.discussionObj.title}</h1>
                <p className="list-group-item-text dicussion-content">{this.props.discussionObj.content}</p>
                <br />
                <div className="list-group-item-text">
                    <span>Read more</span>
                    <div></div>
                    <span className="likes"><i className="glyphicon glyphicon-thumbs-up" />{' '}{this.props.discussionObj.likes}</span>
                    <span className="dislikes"><i className="glyphicon glyphicon-thumbs-down" />{' '}{this.props.discussionObj.dislikes}</span>
                    <div className="discussion-info">
                        <span>created on {this.props.discussionObj.createTime}</span>
                        {this.props.discussionObj.createTime !== this.props.discussionObj.editTime
                            && <span className="discussion-edit-time">edited on {this.props.discussionObj.editTime}</span>}
                    </div>
                </div>
            </Link>
        );
    }
}

export default DiscussionPage;