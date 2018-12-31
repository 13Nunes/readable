// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// UI
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

// Icons
import { FaHome, FaRegUserCircle, FaRegThumbsDown, FaRegThumbsUp, FaRegComments } from 'react-icons/fa';

// Store
import { handleGetPost, handleIncreaseVote, handleDecreaseVote } from '../../store/actions/post';

// Components
import Header from '../../components/Header/Header';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories';
import CommentBox from '../../components/CommentBox/CommentBox';

class Post extends Component {
  // @state
  state = {
    postId: null
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

  render() {
    const { post } = this.props;

    return (
      <div className="store-post">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
            {post.loading === false && (
              <BreadcrumbItem tag="a" href="#" onClick={(e) => this.goToRoute(e, post.data.category)}>{post.data.category.toUpperCase()}</BreadcrumbItem>
            )}
            <BreadcrumbItem active>{post.loading === false && post.data.title}</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                {post.loading === false && (
                  <div>
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
                    <div className="vote-score-container">
                      <span onClick={() => this.decreaseVotes(post.data)}><FaRegThumbsDown /></span>
                      &nbsp;{post.data.voteScore}&nbsp;
                      <span onClick={() => this.increaseVotes(post.data)}><FaRegThumbsUp /></span>
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
                <Button color="warning" size="sm" block onClick={(e) => this.goToHome(e)}><FaHome /> Home</Button>
              </div>
            </div>
          </div>
        </div>
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