// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// Components
import Header from '../../components/Header/Header';
import PostList from '../../components/PostList/PostList';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class Category extends Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps.category)
    if (this.props.category !== prevProps.category) {
      // console.log(prevProps)
    }
  }

  render() {
    const { category } = this.props;

    return (
      <div className="home">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
            <BreadcrumbItem active>{category.name}</BreadcrumbItem>
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

function mapStateToProps({ categories }, props) {
  const { categoryName } = props.match.params;
  const { pathname } = props.location;
  const category = categories.filter((e) => e.path === categoryName);

  return {
    categories,
    category,
    pathname,
  };
}
export default withRouter(connect(mapStateToProps)(Category));
