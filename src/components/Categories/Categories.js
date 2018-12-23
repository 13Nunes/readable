// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// UI
import { ListGroup, ListGroupItem } from 'reactstrap';

// Icons
import { FaCube } from 'react-icons/fa';

// Store
import { handleGetCategories } from '../../store/actions/categories';

class Categories extends Component {
  // @hook
  componentDidMount() {
    // Get categories
    this.props.dispatch(handleGetCategories());
  }

  // @methods
  goToContent(event, route) {
    event.preventDefault();
    this.props.history.push(route);
  }

  render() {
    const { categories } = this.props

    return (
      <div className="categories" >
        <FaCube /> Categories < br /> <br />
        <ListGroup>
          <ListGroupItem tag="a" href='/' onClick={(e) => this.goToContent(e, '/')} key="all">ALL</ListGroupItem>
          {categories.list.map(category => (
            <ListGroupItem tag="a" href={category.path} onClick={(e) => this.goToContent(e, category.path)} key={category.path}>
              {category.name.toUpperCase()}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div >
    );
  }
}

function mapStateToProps({ categories }, props) {
  return {
    categories,
  };
}
export default withRouter(connect(mapStateToProps)(Categories));
