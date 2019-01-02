// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// UI
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

// Icons
import { FaPlusSquare } from 'react-icons/fa';

// Assets
import PageNotFoundImage from '../../assets/images/404.gif';

// Components
import Header from '../../components/Header/Header';
import User from '../../components/User/User';
import Categories from '../../components/Categories/Categories'

class PageNotFound extends Component {
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
            <BreadcrumbItem active>In the middle of nowhere!</BreadcrumbItem>
          </Breadcrumb>
          <div className="content">
            <div className="row">
              <div className="col-sm-8">
                <p>What?<br />This content is no longer available!<br />But, don't worry! It's fine! Go to <a href="/" onClick={(e) => this.goToHome(e)}>Home</a> and try again!</p>
                <img src={PageNotFoundImage} alt="Page not found" />
              </div>
              <div className="col-sm-4">
                <User />
                <Categories />
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

export default withRouter(PageNotFound);
