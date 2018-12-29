// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

// UI
import { ListGroup, ListGroupItem } from 'reactstrap';

// Icons
import { FaCube } from 'react-icons/fa';

// Store
import { handleGetCategories } from '../../store/actions/categories';

class Categories extends Component {
  // @properties
  static propTypes = {
    selected: PropTypes.string
  }

  // @lifecycle
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
    const { categories, selected } = this.props

    return (
      <div className="categories" >
        <FaCube /> Categories < br /> <br />
        <ListGroup>
          <ListGroupItem tag="a" href='/' active={selected === undefined} onClick={(e) => this.goToContent(e, '/')} key="all">ALL</ListGroupItem>
          {categories.list.map(category => (
            <ListGroupItem tag="a" active={selected === category.path} href={category.path} onClick={(e) => this.goToContent(e, category.path)} key={category.path}>
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
