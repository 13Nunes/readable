// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// Components
import Header from '../../components/Header/Header';
import PostList from '../../components/PostList/PostList';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                <PostList />
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

export default withRouter(Home);
