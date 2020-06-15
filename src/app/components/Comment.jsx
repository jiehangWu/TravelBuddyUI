import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

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
        this.fetchUserNameById = this.fetchUserNameById.bind(this);
    }

    createComment(content) {
        axios.post('http://localhost:8080/comment', {
            "ccontent": content,
            "upvote": 0,
            "downvote": 0,
            "longitude": 1,
            "latitude": 1,
            "userId": 1
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
    fetchUserNameById(id) {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(res => {
                const user = res.data;
                this.setState({
                    user
                });
            })
    }

    componentDidMount() {
        this.fetchAllComments();
    }

    render() {
        return (
            <div className="container">
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
                                // TODO user={this.fetchUserNameById(comment.userid)} />
                        );
                    })
                }
            </div>
        );
    }
};

const styles = makeStyles((theme) => ({
    container: {
        width: "60%",
        marginLeft: "20%",
        marginRight: "20%"
    }
}));

const Comment = ({ comment, user }) => {
    const classes = styles();

    return (
        <div className={classes.container}>
            <Card className={classes.post} >
                <CardHeader
                    title={user}
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {comment}
                    </Typography>
                </CardContent>
                <IconButton aria-label="like">
                    <FavoriteIcon color='secondary' />
                </IconButton>
            </Card>
        </div>
    );
};
