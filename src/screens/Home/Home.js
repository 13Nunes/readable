// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// Components
import Header from '../../components/Header/Header';
import PostList from '../../components/PostList/PostList';

// Store
import { handleGetPosts } from '../../store/actions/posts';

class Home extends Component {
  // @hooks
  componentDidMount() {
    this.props.dispatch(handleGetPosts());
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
          </Breadcrumb>
          <PostList posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, props) {
  return {
    posts,
  };
}

export default withRouter(connect(mapStateToProps)(Home));