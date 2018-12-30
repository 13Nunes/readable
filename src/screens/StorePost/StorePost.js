// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

// Icons
import { FaHome } from 'react-icons/fa';

// Components
import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class StorePost extends Component {
  // @state
  state = {
    pageTitle: 'New Post',
    postId: null
  }

  // @lifecycle
  componentWillMount() {
    if (this.props.match.path === '/:categoryName/:postId/edit' && Object.keys(this.props.match.params).length === 2) {
      const postId = this.props.match.params.postId || 0;

      this.setState({
        postId,
        pageTitle: 'Edit Post'
      });
    }
  }

  // @methods
  goToHome(event) {
    event.preventDefault();
    this.props.history.push('/');
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

export default withRouter(StorePost);
