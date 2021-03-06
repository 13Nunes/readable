// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

// Icons
import { FaPlusSquare } from 'react-icons/fa';

// Assets
import backImage from '../../assets/images/back.gif';

// Components
import Header from '../../components/Header/Header';
import PostList from '../../components/PostList/PostList';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class Category extends Component {
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
    const { category, validCategory } = this.props;
    const categoryTitle = category.name.charAt(0).toUpperCase() + category.name.slice(1);

    return (
      <div className="category">
        <Header />
        <div className="container">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="#" onClick={(e) => this.goToHome(e)}>Home</BreadcrumbItem>
            <BreadcrumbItem active>{categoryTitle}</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                {validCategory === true ?
                  <PostList category={category.name} /> :
                  <div>
                    Ooops! Invalid category <br /><br />
                    <img src={backImage} alt="Back" />
                  </div>
                }
              </div>
              <div className="col-sm-4">
                <User />
                <Categories selected={category.name} />
                <hr />
                <Button color="primary" size="sm" block onClick={(e) => this.goToNewPost(e)}><FaPlusSquare />&nbsp;New Post</Button>
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
  let validCategory = true;

  if (categories.loading === false) {
    category = categories.list.filter((e) => e.path === categoryName);
    category = category[0];
    if (category === undefined) {
      category = { name: 'Oh No!' };
      validCategory = false;
    }
  }

  return {
    categories,
    category,
    pathname,
    validCategory
  };
}
export default withRouter(connect(mapStateToProps)(Category));
