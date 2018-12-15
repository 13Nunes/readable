// Basic
import React, { Component } from 'react';
import moment from 'moment';

// Styles
import './PostItem.css';

// UI
import {
  Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter,
  Badge,
  Button
} from 'reactstrap';

class PostItem extends Component {
  goToContent(id) {
    console.log(id);
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
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>Author: {author}</CardSubtitle>
          <CardText>
            {body}<br />
            Category: <Badge href="#" color="light">{category}</Badge>
            {voteScore} / {commentCount} - {moment(timestamp).format('ddd, MMMM Do YYYY')}
          </CardText>
        </CardBody>
        <CardFooter>
          <Button size="sm" color="primary" onClick={() => this.goToContent(id)}>Read more</Button>
        </CardFooter>
      </Card>
    );
  }
}

export default PostItem;
