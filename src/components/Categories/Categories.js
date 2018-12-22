// Basic
import React, { Component } from 'react';
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

  render() {
    const { categories } = this.props

    return (
      <div className="categories">
        <FaCube /> Categories <br /><br />
        <ListGroup>
          <ListGroupItem tag="a" href="/" key="all">ALL</ListGroupItem>
          {categories.map(category => (
            <ListGroupItem tag="a" href={category.path} key={category.path}>{category.name.toUpperCase()}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({ categories }, props) {
  return {
    categories,
  };
}
export default connect(mapStateToProps)(Categories);