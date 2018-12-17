// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// Icons
import { FaRegUser, FaPencilAlt, FaSave, FaTimes } from 'react-icons/fa';

// Styles
import './User.css';

// Store
import { handleSetUser } from '../../store/actions/user';

class User extends Component {
  state = {
    modalOpened: false,
    name: ''
  }

  // @hook
  componentWillMount() {
    // Get user
    let user = localStorage.getItem('user') || null;
    user = JSON.parse(user)

    if (user === null) {
      // Define initial user
      const defaultUser = {
        'id': Math.random().toString(36).substr(-8),
        'name': 'Udacity Student'
      }

      // Save user on local Storage
      localStorage.setItem('user', JSON.stringify(defaultUser))

      // Set initial user
      user = defaultUser;
    }

    // Set user
    this.props.dispatch(handleSetUser(user));

    // Update input
    this.handleChange(user.name);
  }

  // @methods
  toggleModal = () => {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }

  handleChange = (name) => {
    this.setState({
      name
    })
  }

  saveUserData = () => {
    // Prepare data
    const user = {
      'id': this.props.user.id,
      'name': this.state.name
    }

    // Save on redux store
    this.props.dispatch(handleSetUser(user));

    // Save user on local Storage
    localStorage.setItem('user', JSON.stringify(user));

    // Close modal
    this.toggleModal();
  }

  render() {
    const { user } = this.props

    return (
      <div className="user-interface">
        <FaRegUser /> Hi, {user.name} <span className="edit-user" onClick={this.toggleModal}><FaPencilAlt /></span>
        <hr />
        <Modal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>User data</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="username">Name</Label>
                <Input type="text" name="username" id="username" onChange={e => this.handleChange(e.target.value)} value={this.state.name} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={this.toggleModal}><FaTimes /> Cancel</Button>
            <Button color="success" onClick={this.saveUserData}><FaSave /> Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ user }, props) {
  return {
    user,
  };
}
export default connect(mapStateToProps)(User);