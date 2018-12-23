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
    if (this.props.categories.loading === false) {

    }
  }

  render() {
    const { category } = this.props;
    const categoryTitle = category.name.charAt(0).toUpperCase() + category.name.slice(1);

    return (
      <div className="category">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
            <BreadcrumbItem active>{categoryTitle}</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                <PostList category={category.name} />
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
  let category = { name: '' };

  if (categories.loading === false) {
    category = categories.list.filter((e) => e.path === categoryName);
    category = category[0];
    if (category === undefined) {
      category = { name: 'Inválida' };
    }
  }

  return {
    categories,
    category,
    pathname,
  };
}
export default withRouter(connect(mapStateToProps)(Category));
