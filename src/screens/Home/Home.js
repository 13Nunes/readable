// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

// Icons
import { FaPlusSquare } from 'react-icons/fa';

// Components
import Header from '../../components/Header/Header';
import PostList from '../../components/PostList/PostList';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class Home extends Component {
  // @methods
  goToNewPost(event) {
    event.preventDefault();
    this.props.history.push('/new-post');
  }
  goToHome(event) {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="#" onClick={(e) => this.goToHome(e)}>Home</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                <PostList />
              </div>
              <div className="col-sm-4">
                <User />
                <Categories />
                <hr />
                <Button color="primary" size="sm" block onClick={(e) => this.goToNewPost(e)}><FaPlusSquare /> New Post</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
