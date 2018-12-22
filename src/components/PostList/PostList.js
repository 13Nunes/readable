// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import PostItem from '../../components/PostItem/PostItem';

// Store
import { handleGetPosts } from '../../store/actions/posts';

// UI
import { ButtonGroup, Button, InputGroup, Input } from 'reactstrap';

// Icons
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

// Assets
import './Postlist.css';

class PostList extends Component {
  // @states
  state = {
    sortType: 'DATE',
    sortOrder: 'DESC',
  };

  // @hooks
  componentDidMount() {
    const { sortType, sortOrder } = this.state;
    this.props.dispatch(handleGetPosts(sortType, sortOrder));
  }

  // @methods
  sortPostsByDate() {
    this.setState({
      sortType: 'DATE'
    });
    this.props.dispatch(handleGetPosts('DATE', this.state.sortOrder));
  }
  sortPostsByVotes() {
    this.setState({
      sortType: 'VOTES'
    });
    console.log(this.state.sortType)
    this.props.dispatch(handleGetPosts('VOTES', this.state.sortOrder));
  }
  toggleSortOrder() {
    const sortOrder = this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC';

    this.setState({
      sortOrder
    });
    this.props.dispatch(handleGetPosts(this.state.sortType, sortOrder));
  }

  render() {
    const { sortType, sortOrder } = this.state;

    return (
      <div className="post-list">
        <div className="toolbar">
          <div>
            Sort by&nbsp;
            <ButtonGroup size="sm">
              <Button outline color="info" onClick={() => this.sortPostsByDate()} active={sortType === 'DATE'}>Date</Button>
              <Button outline color="info" onClick={() => this.sortPostsByVotes()} active={sortType === 'VOTES'}>Votes</Button>
            </ButtonGroup>&nbsp;
            {(sortOrder === 'DESC') && <FaSortAmountDown className="sort-icon sort-down" onClick={() => this.toggleSortOrder()} />}
            {(sortOrder === 'ASC') && <FaSortAmountUp className="sort-icon sort-up" onClick={() => this.toggleSortOrder()} />}
          </div>
          <div>
            <InputGroup size="sm">
              <Input placeholder="Search..." />
            </InputGroup>
          </div>
        </div >
        <br />
        {
          this.props.posts.map(post => (
            <PostItem post={post} key={post.id} />
          ))
        }
      </div >
    );
  }
}

function mapStateToProps({ posts }, props) {
  return {
    posts,
  };
}
export default connect(mapStateToProps)(PostList);