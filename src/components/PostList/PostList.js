// Basic
import React, { Component } from 'react';

// Components
import PostItem from '../../components/PostItem/PostItem';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

// UI
import { ButtonGroup, Button } from 'reactstrap';

class PostList extends Component {
  render() {
    return (
      <div className="post-list">
        <div className="row">
          <div className="col-sm-8">
            <div className="toolbar text-right">
              Sort by&nbsp;
              <ButtonGroup size="sm">
                <Button outline color="info">Date</Button>
                <Button outline color="info">Votes</Button>
              </ButtonGroup>
            </div>
            <br />
            {this.props.posts.map(post => (
              <PostItem post={post} key={post.id} />
            ))}
          </div>
          <div className="col-sm-4">
            <User />
            <Categories />
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;