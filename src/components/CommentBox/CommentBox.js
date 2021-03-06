// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// UI
import {
  Form, FormGroup, Label, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

// Icons
import {
  FaPaperPlane,
  FaUser,
  FaRegComments,
  FaAngleDown, FaAngleUp,
  FaEdit,
  FaTimes,
  FaCheck,
  FaRegSave,
  FaBan,
  FaRegTrashAlt
} from 'react-icons/fa';

// Assets
import './CommentBox.css';

// Store
import {
  handleGetPostComments,
  handleIncreaseCommentVotes,
  handleDecreaseCommentVotes,
  handleAddComment,
  handleDeleteComment,
  handleToggleEditModeComment,
  handleEditComment
} from '../../store/actions/comments';

class CommentBox extends Component {
  // @states
  state = {
    comment: '',
    selectedComment: null,
    editedComment: '',
    modalConfirmOpened: false
  }

  // @lifecycle
  componentDidMount() {
    const { postId } = this.props;
    this.props.dispatch(handleGetPostComments(postId));
  }
  componentDidUpdate(prevProps) {
    const { postId } = this.props;
    if (postId !== prevProps.postId) {
      this.props.dispatch(handleGetPostComments(postId));
    }
  }

  // @methods
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }
  onFormSubmit = (e) => {
    // Cancel default event
    e.preventDefault();

    // Prepare user data
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    // Prepare comment data
    const commentData = {
      id: Math.random().toString(36).substr(-8),
      timestamp: Date.now(),
      body: this.state.comment,
      author: user.login,
      parentId: this.props.postId,
      editing: false
    }

    // New comment
    this.props.dispatch(handleAddComment(commentData));

    // Clear comment form
    this.setState({
      comment: ''
    });
  }
  increaseVotes(comment) {
    this.props.dispatch(handleIncreaseCommentVotes(comment));
  }
  decreaseVotes(comment) {
    this.props.dispatch(handleDecreaseCommentVotes(comment));
  }
  toggleModal = (comment = null) => {
    this.setState({
      modalConfirmOpened: !this.state.modalConfirmOpened,
      selectedComment: comment
    });
  }
  deleteComment() {
    const { selectedComment } = this.state;
    this.props.dispatch(handleDeleteComment(selectedComment.id));
    this.toggleModal(null);
  }
  enableEditModeComment(comment) {
    this.setState({
      editedComment: comment.body
    })
    this.toggleEditMode(comment);
  }
  toggleEditMode(comment) {
    this.props.dispatch(handleToggleEditModeComment(comment));
  }
  editComment(comment) {
    // Prepare comment data
    const commentData = {
      id: comment.id,
      timestamp: Date.now(),
      body: this.state.editedComment
    }

    // Edit comment
    this.props.dispatch(handleEditComment(commentData));

    // Clear comment form
    this.setState({
      editedComment: ''
    });
  }

  render() {
    const { comments } = this.props;
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    return (
      <div className="comment-box">
        <h3><FaRegComments />&nbsp;Comments</h3>
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup tag="fieldset">
            <FormGroup>
              <Label for="postComment">Post content</Label>
              <Input type='textarea' maxLength='500' required name='postComment' id='postComment' rows={4}
                onChange={e => this.handleInputChange('comment', e.target.value)} aria-multiline='true'
                value={this.state.comment} />
            </FormGroup>
            <FormGroup check className="float-right">
              <Button color="success"><FaPaperPlane />&nbsp;Comment</Button>
            </FormGroup>
          </FormGroup>
        </Form>
        {comments.loading === false && comments.list.map(comment => (
          <div key={comment.id} className="comment">
            <span className="text-muted"><FaUser /> {comment.author === user.login ? user.name : comment.author} at {moment(comment.timestamp).format('MMMM Do YYYY')}</span> <br />
            {comment.editing === false ? comment.body : (
              <div><br />
                <Form>
                  <FormGroup tag="fieldset">
                    <FormGroup>
                      <Input type='textarea' maxLength='500' required name='editedComment' id='editedComment' rows={4}
                        onChange={e => this.handleInputChange('editedComment', e.target.value)} aria-multiline='true'
                        value={this.state.editedComment} />
                    </FormGroup>
                    <FormGroup check className="float-right">
                      <Button color="link" onClick={() => this.toggleEditMode(comment)}><FaBan />&nbsp;Cancel</Button>
                      <Button color="success" onClick={() => this.editComment(comment)}><FaRegSave />&nbsp;Edit comment</Button>
                    </FormGroup>
                  </FormGroup>
                </Form>
              </div>
            )}
            <hr />
            <div className="comment-actions">
              <div className="vote-score-container">
                <span onClick={() => this.decreaseVotes(comment)}><FaAngleDown /></span>
                &nbsp;{comment.voteScore}&nbsp;
                <span onClick={() => this.increaseVotes(comment)}><FaAngleUp /></span>
              </div>
              {comment.author === user.login && (
                <div className="comment-buttons">
                  {comment.editing === false && (
                    <Button color="link" onClick={() => this.enableEditModeComment(comment)}><FaEdit />&nbsp;Edit</Button>
                  )}
                  <Button color="link" onClick={() => this.toggleModal(comment)}><FaRegTrashAlt />&nbsp;Delete</Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <Modal isOpen={this.state.modalConfirmOpened} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Attention</ModalHeader>
          <ModalBody>
            Are you sure delete this comment ?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.toggleModal}><FaTimes /> Cancel</Button>
            <Button color="primary" onClick={() => this.deleteComment()}><FaCheck /> Confirm</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ comments }, props) {
  return {
    comments
  };
}
export default withRouter(connect(mapStateToProps)(CommentBox));