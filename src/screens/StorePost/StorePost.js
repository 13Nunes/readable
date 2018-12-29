// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// Components
import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class StorePost extends Component {
  // @state
  state = {
    operation: 'add',
    pageTitle: 'New Post',
    category: null,
    postId: null
  }

  // @lifecycle
  componentWillMount() {
    if (this.props.match.path === '/:categoryName/:postId/edit' && Object.keys(this.props.match.params).length === 2) {
      const category = this.props.match.params.categoryName || '';
      const postId = this.props.match.params.postId || 0;

      this.setState({
        operation: 'edit',
        category,
        postId
      });
    }
  }

  render() {
    const { pageTitle, postId } = this.state;

    return (
      <div className="store-post">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
            <BreadcrumbItem active>{pageTitle}</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                {postId !== null ? <PostForm postId={postId} /> : <PostForm />}
              </div>
              <div className="col-sm-4">
                <User />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StorePost);
