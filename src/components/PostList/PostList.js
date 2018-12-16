// Basic
import React, { Component } from 'react';

// Components
import PostItem from '../../components/PostItem/PostItem';

class PostList extends Component {
  render() {
    return (
      <div className="post-list">
        <div className="row">
          <div className="col-sm-8">
            {
              this.props.posts.map(post => (
                <PostItem post={post} key={post.id} />
              ))
            }
          </div>
          <div className="col-sm-4">
            Aside
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;