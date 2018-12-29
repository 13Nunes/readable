// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Store
import { handleGetPost } from '../../store/actions/post';

class PostForm extends Component {
  // @states
  state = {
    title: '',
    category: '',
    content: ''
  }

  // @lifecycle
  componentDidMount() {
    const { postId } = this.props;
    // Load post
    if (postId !== undefined) {
      this.props.dispatch(handleGetPost(postId));
    }
  }
  componentWillReceiveProps() {
    const { post } = this.props;
    if (this.props.post.loading === false) {
      this.setState({
        title: post.title
      });
    }
  }

  // @methods
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }
  onFormSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="post-form">
        <Form onSubmit={this.onFormSubmit}>
          <FormGroup tag="fieldset">
            <FormGroup>
              <Label for="postTitle">Title</Label>
              <Input type="text" name="postTitle" id="postTitle" onChange={e => this.handleInputChange('title', e.target.value)} value={this.state.title} />
            </FormGroup>
            <FormGroup>
              <Label for="postCategory">Category</Label>
              <Input type="select" name="postCategory" id="postCategory">
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
              <Input type='textarea' maxLength='500' name='postContent' id='postContent' rows={4}
                onChange={e => this.handleInputChange('content', e.target.value)} aria-multiline='true'
                value={this.state.content} />
            </FormGroup>
            <FormGroup check inline>
              <Button color="success">Publish post</Button>
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
export default connect(mapStateToProps)(PostForm);
