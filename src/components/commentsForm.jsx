import React from 'react'
import {postComment} from '../api'

class CommentForm extends React.Component {

state = {
    userInput: null
}


handleSubmit = (e) => {
    e.preventDefault();
    const commentBody = {
        username: this.props.loggedInUser,
        body: this.state.userInput
    }
    postComment(commentBody, this.props.article_id).then(comment => {
        console.log(comment)
    })
}

storeUserInput = event => {
    this.setState({ userInput: event.target.value });
  };

render() {
    return (
        <div><form onSubmit={this.handleSubmit}>
        Post Comment: <input onChange={this.storeUserInput} type='text'></input>
        <button type='submit'>Press for internet carnage!</button>
        </form></div>
    )
}


}

export default CommentForm