// Basic
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// UI
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Icons
import { FaSave } from 'react-icons/fa';

// Store
import { handleGetPost, handleAddPost, handleEditPost } from '../../store/actions/post';

class PostForm extends Component {
  // @states
  state = {
    title: '',
    category: '',
    content: ''
  }

  // @lifecycle
  componentWillMount() {
    const { postId } = this.props;
    // Load post
    if (postId !== undefined) {
      this.props.dispatch(handleGetPost(postId));
    }
  }
  componentDidUpdate(prevProps) {
    const { post } = this.props;
    if (post !== prevProps.post) {
      this.setState({
        title: post.data.title,
        content: post.data.body,
        category: post.data.category
      })
    }
  }

  // @methods
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }
  onFormSubmit = (e) => {
    // Cancel default event
    e.preventDefault();

    // Get values
    const { title, category, content } = this.state;
    const { postId } = this.props;
    let user = localStorage.getItem('user') || null;
    user = JSON.parse(user)

    // Edit/Add post
    if (postId !== undefined) {
      const postData = {
        id: postId,
        title,
        body: content,
        category
      }
      this.props.dispatch(handleEditPost(postData));
    } else {
      const postData = {
        id: Math.random().toString(36).substr(-8),
        timestamp: Date.now(),
        title,
        body: content,
        author: user.name,
        category
      }
      this.props.dispatch(handleAddPost(postData));
    }

    // Go to home
    this.props.history.push('/');
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="post-form">
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup tag="fieldset">
            <FormGroup>
              <Label for="postTitle">Title</Label>
              <Input type="text" name="postTitle" id="postTitle" required onChange={e => this.handleInputChange('title', e.target.value)} value={this.state.title} />
            </FormGroup>
            <FormGroup>
              <Label for="postCategory">Category {this.state.category}</Label>
              <Input type="select" name="postCategory" id="postCategory" required onChange={e => this.handleInputChange('category', e.target.value)} value={this.state.category}>
                {categories.loading === true && (
                  <option value="">Loading...</option>
                )}
                {categories.loading === false && categories.list.map(category => (
                  <option value={category.path} key={category.path}>
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="postContent">Post content</Label>
              <Input type='textarea' maxLength='500' required name='postContent' id='postContent' rows={4}
                onChange={e => this.handleInputChange('content', e.target.value)} aria-multiline='true'
                value={this.state.content} />
            </FormGroup>
            <FormGroup check inline>
              <Button color="success"><FaSave /> Publish post</Button>
            </FormGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ categories, post }, props) {
  return {
    categories,
    post
  };
}
export default withRouter(connect(mapStateToProps)(PostForm));
