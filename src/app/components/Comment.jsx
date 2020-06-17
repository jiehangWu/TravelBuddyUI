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

export class Input extends Component {
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
    }

    createComment(content) {
        axios.post('http://localhost:8080/comment', {
            "ccontent": content,
            "upvote": 0,
            "downvote": 0,
<<<<<<< HEAD
            "longitude": "49.288024",
            "latitude": "-123.127126",
            "userId": 1
=======
            "longitude": -123.2034,
            "latitude": 49.2649,
            "userId": 1,
            "id":3
>>>>>>> a618104dbad85a0d78e4686d89e6b3c21f9d89c7
        })
            .then(() => {
                this.fetchAllComments();
            });
    }

    handleInputChange(e) {
        const textFieldValue = e.target.value;
        this.setState({
            textFieldValue
        });
        console.log(this.state.textFieldValue);
    }

    fetchAllComments() {
        axios.get('http://localhost:8080/comments')
            .then(res => {
                const comments = res.data;
                this.setState({
                    comments
                });
            });
    }

    // TODO
    // fetchUserNameById(id) {
    //     axios.get(`http://localhost:8080/users/${id}`)
    //         .then(res => {
    //             const user = res.data;
    //             this.setState({
    //                 user
    //             });
    //         })
    // }

    componentDidMount() {
        this.fetchAllComments();
    }

   
    render() {
        return (
            <div className="container" style={{ marginTop: "50px" }}>
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
