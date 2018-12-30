// Basic
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

// Styles
import './PostItem.css';

// Icons
import { FaRegUserCircle, FaRegThumbsDown, FaRegThumbsUp, FaRegComments } from 'react-icons/fa';

// UI
import {
  Card, CardBody, CardTitle, CardFooter,
  Badge,
  Button
} from 'reactstrap';

// Store
import { handleIncreaseVotes, handleDecreaseVotes } from '../../store/actions/posts';

class PostItem extends Component {
  goToContent(category, id) {
    this.props.history.push(`/${category}/${id}`);
  }

  increaseVotes(post) {
    this.props.dispatch(handleIncreaseVotes(post));
  }

  decreaseVotes(post) {
    this.props.dispatch(handleDecreaseVotes(post));
  }

  render() {
    const {
      title,
      author,
      body,
      category,
      commentCount,
      timestamp,
      voteScore,
      id,
    } = this.props.post;

    return (
      <Card className="post-item">
        <CardBody>
          <CardTitle><Link to={`/${category}/${id}`}>{title}</Link> - <Badge href="#" color="light">{category}</Badge></CardTitle>
          <div className="toolbar">
            <div className="publish-info">
              <FaRegUserCircle />&nbsp;
                {author}&nbsp;|&nbsp;{moment(timestamp).format('ddd, MMMM Do YYYY')}
            </div>

            <div className="comment-count">
              <FaRegComments />&nbsp;&nbsp;{commentCount}
            </div>
          </div>
          {body}<br />
        </CardBody>
        <CardFooter className="footer">
          <div className="vote-score-container">
            <span onClick={() => this.decreaseVotes(this.props.post)}><FaRegThumbsDown /></span>
            &nbsp;{voteScore}&nbsp;
            <span onClick={() => this.increaseVotes(this.props.post)}><FaRegThumbsUp /></span>
          </div>
          <Button size="sm" color="primary" onClick={() => this.goToContent(category, id)}>Read more</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default withRouter(connect()(PostItem));