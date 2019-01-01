// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// UI
import {
  Breadcrumb, BreadcrumbItem, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

// Icons
import {
  FaHome,
  FaRegUserCircle,
  FaRegThumbsDown, FaRegThumbsUp,
  FaRegComments,
  FaTrash,
  FaPencilAlt,
  FaTimes,
  FaCheck
} from 'react-icons/fa';

// Style
import './Post.css';

// Store
import { handleGetPost, handleIncreaseVote, handleDecreaseVote, handleDeletePost } from '../../store/actions/post';

// Components
import Header from '../../components/Header/Header';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories';
import CommentBox from '../../components/CommentBox/CommentBox';

class Post extends Component {
  // @state
  state = {
    postId: null,
    modalConfirmOpened: false,
  }

  // @lifecycle
  componentWillMount() {
    const postId = this.props.match.params.postId;
    this.props.dispatch(handleGetPost(postId));
  }

  // @methods
  goToHome(event) {
    event.preventDefault();
    this.props.history.push('/');
  }
  goToRoute(event, route) {
    event.preventDefault();
    this.props.history.push(`/${route}`);
  }
  increaseVotes(post) {
    this.props.dispatch(handleIncreaseVote(post));
  }
  decreaseVotes(post) {
    this.props.dispatch(handleDecreaseVote(post));
  }
  editPost() {
    const postId = this.props.match.params.postId;
    const categoryName = this.props.match.params.categoryName;
    this.props.history.push(`/${categoryName}/${postId}/edit`);
  }
  deletePost() {
    const postId = this.props.match.params.postId;
    const categoryName = this.props.match.params.categoryName;
    this.props.dispatch(handleDeletePost(postId));
    this.props.history.push(`/${categoryName}`);
  }
  toggleModal = () => {
    this.setState({
      modalConfirmOpened: !this.state.modalConfirmOpened
    });
  }

  render() {
    const { post, history } = this.props;

    // Get current user
    let user = localStorage.getItem('user') || null;
    user = JSON.parse(user);

    // Safe
    if (post.loading === false && post.data.error) history.push('/page-not-found');
    if (post.loading === false && post.data.error) return (<div>Redirecting...</div>);

    return (
      <div className="store-post">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="#" onClick={(e) => this.goToHome(e)}>Home</BreadcrumbItem>
            {post.loading === false && (
              <BreadcrumbItem tag="a" href="#" onClick={(e) => this.goToRoute(e, post.data.category)}>
                {post.data.category.charAt(0).toUpperCase() + post.data.category.slice(1)}
              </BreadcrumbItem>
            )}
            <BreadcrumbItem active>{post.loading === false && post.data.title}</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                {post.loading === false && (
                  <div className="post">
                    <h1>{post.data.title}</h1>
                    <div className="toolbar">
                      <div className="publish-info">
                        <FaRegUserCircle />&nbsp;
                        {post.data.author}&nbsp;|&nbsp;{moment(post.data.timestamp).format('ddd, MMMM Do YYYY')}
                      </div>
                      <div className="comment-count">
                        <FaRegComments />&nbsp;&nbsp;{post.data.commentCount}
                      </div>
                    </div><br />
                    <p>{post.data.body}</p>
                    <div className="actions">
                      <div className="vote-score-container">
                        <span className="down" onClick={() => this.decreaseVotes(post.data)}><FaRegThumbsDown /></span>
                        &nbsp;{post.data.voteScore}&nbsp;
                        <span className="up" onClick={() => this.increaseVotes(post.data)}><FaRegThumbsUp /></span>
                      </div>
                      {post.data.author === user.login && (
                        <div className="buttons">
                          <Button color="warning" size="sm" onClick={(e) => this.editPost(e)}><FaPencilAlt /> Edit</Button>
                          <Button color="danger" size="sm" onClick={this.toggleModal}><FaTrash /> Delete</Button>
                        </div>
                      )}
                    </div>
                    <hr />
                    <CommentBox postId={post.data.id} />
                  </div>
                )}
              </div>
              <div className="col-sm-4">
                <User />
                <Categories selected={this.props.match.params.categoryName} />
                <hr />
                <Button color="primary" size="sm" block onClick={(e) => this.goToHome(e)}><FaHome /> Home</Button>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modalConfirmOpened} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Attention</ModalHeader>
          <ModalBody>
            Are you sure delete this post ?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.toggleModal}><FaTimes /> Cancel</Button>
            <Button color="primary" onClick={() => this.deletePost()}><FaCheck /> Confirm</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ categories, post }, props) {
  return {
    categories,
    post
  };
}
export default withRouter(connect(mapStateToProps)(Post));