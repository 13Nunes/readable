// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

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
  // @properties
  static propTypes = {
    category: PropTypes.string
  }

  // @states
  state = {
    sortType: 'DATE',
    sortOrder: 'DESC',
    search: ''
  };

  // @lifecycle
  componentDidMount() {
    this.loadPostList();
  }
  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.loadPostList();
    }
  }

  // @methods
  sortPostsByDate() {
    this.setState({
      sortType: 'DATE'
    });
    this.props.dispatch(handleGetPosts('DATE', this.state.sortOrder, this.state.search));
  }
  sortPostsByVotes() {
    this.setState({
      sortType: 'VOTES'
    });
    this.props.dispatch(handleGetPosts('VOTES', this.state.sortOrder, this.state.search));
  }
  toggleSortOrder() {
    const sortOrder = this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.setState({
      sortOrder
    });
    this.props.dispatch(handleGetPosts(this.state.sortType, sortOrder, this.state.search));
  }
  handleSearchChange(event) {
    const search = event.target.value;
    this.setState({
      search
    });
    this.props.dispatch(handleGetPosts(this.state.sortType, this.state.sortOrder, search));
  }
  loadPostList() {
    const { sortType, sortOrder, search } = this.state;
    const { category } = this.props;
    this.props.dispatch(handleGetPosts(sortType, sortOrder, search, category));
  }

  render() {
    const { sortType, sortOrder, search } = this.state;
    const { posts } = this.props;

    return (
      <div className="post-list">
        <div className="toolbar">
          <div>
            Sort by&nbsp;
            <ButtonGroup size="sm">
              <Button outline color="primary" onClick={() => this.sortPostsByDate()} active={sortType === 'DATE'}>Date</Button>
              <Button outline color="primary" onClick={() => this.sortPostsByVotes()} active={sortType === 'VOTES'}>Votes</Button>
            </ButtonGroup>&nbsp;
            {(sortOrder === 'DESC') && <FaSortAmountDown className="sort-icon sort-down" onClick={() => this.toggleSortOrder()} />}
            {(sortOrder === 'ASC') && <FaSortAmountUp className="sort-icon sort-up" onClick={() => this.toggleSortOrder()} />}
          </div>
          <div>
            <InputGroup size="sm">
              <Input placeholder="Search..." value={search} onChange={this.handleSearchChange.bind(this)} />
            </InputGroup>
          </div>
        </div >
        <br />
        {posts.loading === true && (
          <div>Waiting...</div>
        )}
        {(posts.loading === false && posts.list.length === 0) && (
          <div>Sorry. No posts in this category yet</div>
        )}
        {posts.loading === false && posts.list.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
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