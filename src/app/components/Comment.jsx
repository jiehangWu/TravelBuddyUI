import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Component } from 'react';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';import IconButton from '@material-ui/core/IconButton';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

export class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            textFieldValue: "",
            user: ""
        };
        this.fetchAllComments = this.fetchAllComments.bind(this);
        this.createComment = this.createComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // this.fetchUserNameById = this.fetchUserNameById.bind(this);

        this.props.user = {
            id: "",
            displayName: ""
        }
        this.props.destination = {
            lat: 0.0,
            lng: 0.0
        }
    }

    createComment(content) {
        console.log(this.props.destination)
        console.log(this.props.user)
        if (this.props.user != "") {
            axios.post('http://localhost:8080/comment', {
                "ccontent": content,
                "upvote": 0,
                "downvote": 0,
                "latitude": this.props.destination.lat,
                "longitude": this.props.destination.lng,
                "userId": this.props.user.id,
            })
            .then(() => {
                this.fetchAllComments();
            });
        }
    }

    handleInputChange(e) {
        const textFieldValue = e.target.value;
        this.setState({
            textFieldValue
        });
        console.log(this.state.textFieldValue);
    }

    fetchAllComments() {
        console.log(this.props.destination);
        axios.get(`http://localhost:8080/comments/${this.props.destination.lat}/${this.props.destination.lng}`)
            .then(res => {
                const comments = res.data;
                this.setState({
                    comments
                });
            });
    }

    componentDidMount() {
        this.fetchAllComments();
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "50px" }}>
                <button onClick={() => {
                    this.fetchAllComments()
                }}
                >Refresh comments</button>
                <Card className="input-area my-3">
                    <div className="row">
                        <div className="col-lg-10">
                            <textarea className="text-box mx-2 mt-3"
                                rows="3"
                                placeholder="Post a comment here"
                                required
                                onChange={(e) => {
                                    this.handleInputChange(e)
                                }}>
                            </textarea>
                            <button type="button" className="btn btn-primary float-right mx-4 mb-3" onClick={() => {
                                this.createComment(this.state.textFieldValue)
                            }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Card>
                {
                    this.state.comments.map(comment => {
                        return (
                            <Comment comment={comment.ccontent}
                                _id={comment.id}
                                upvote={comment.upvote}
                                downvote={comment.downvote} 
                                parentMethod={() => this.fetchAllComments()}/>
                        );
                    })
                }
            </div>
        );
    }
};

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            _id: props._id,
            upvote: props.upvote,
            downvote: props.downvote,
            comment: props.comment,
            parentMethod: props.parentMethod
        }
    }

    upvote() {
        axios.put(`http://localhost:8080/upvote/${this.state._id}`)
        .then(() => {
            this.fetchUpvoteById(this.state._id);
        });
    }

    downvote() {
        axios.put(`http://localhost:8080/downvote/${this.state._id}`)
        .then(() => {
            this.fetchDownvoteById(this.state._id);
        });
    }

    delete() {
        axios.delete(`http://localhost:8080/comment/${this.state._id}`)
            .then(() => {
                this.props.parentMethod();
            });
    }

    fetchUpvoteById(id) {
        axios.get(`http://localhost:8080/upvote/${id}`)
            .then((res) => {
                const upvote = res.data;
                this.setState({
                    upvote
                });
            });
    }

    fetchDownvoteById(id) {
        axios.get(`http://localhost:8080/downvote/${id}`)
            .then((res) => {
                const downvote = res.data;
                this.setState({
                    downvote
                });
            });
    }

    render() {
        return (
            <div className="container">
                <Card className="comment">
                    <CardHeader
                        title={this.state.user}
                    >
                    </CardHeader>
                    <CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">
                            {this.state.comment}
                        </Typography>
                    </CardContent>
                    <IconButton aria-label="upvote" onClick={() => this.upvote()}>
                        <FavoriteIcon color='secondary'/>
                        <div>
                        {this.state.upvote}
                        </div>
                    </IconButton>
                    <IconButton aria-label="downvote" onClick={() => this.downvote()}>
                        <ThumbDownAltIcon color='default'/>
                        <div>
                        {this.state.downvote}
                        </div>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => this.delete()}>
                        <DeleteForeverIcon color='default'/>
                    </IconButton>
                </Card>
            </div>
        );
    }
};
