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

const templates = [
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'jornal',
  'litera',
  'lumen',
  'lux',
  'materia',
  'minty',
  'pulse',
  'sandstone',
  'simplex',
  'sketchy',
  'slate',
  'solar',
  'spacelab',
  'superhero',
  'united',
  'yeti'
];

class User extends Component {
  state = {
    modalOpened: false,
    name: '',
    login: '',
    template: 'cerulean'
  }

  // @lifecycle
  componentWillMount() {
    // Get user
    let user = localStorage.getItem('user') || null;
    user = JSON.parse(user)

    if (user === null) {
      // Define initial user
      const defaultUser = {
        id: Math.random().toString(36).substr(-8),
        name: 'Udacity Student',
        login: 'udacityStudent',
        template: 'cerulean'
      }

      // Save user on local Storage
      localStorage.setItem('user', JSON.stringify(defaultUser))

      // Set initial user
      user = defaultUser;
    }

    // Set user
    this.props.dispatch(handleSetUser(user));

    // Update input
    this.setState({
      name: user.name,
      login: user.login,
      template: user.template
    })
  }

  // @methods
  toggleModal = () => {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  saveUserData = () => {
    // Prepare data
    const user = {
      id: this.props.user.id,
      name: this.state.name,
      login: this.state.login,
      template: this.state.template
    }

    // Save on redux store
    this.props.dispatch(handleSetUser(user));

    // Save user on local Storage
    localStorage.setItem('user', JSON.stringify(user));

    // Change template
    document.getElementById('theme').setAttribute('href', `${process.env.PUBLIC_URL}/themes/bootstrap.${user.template}.min.css?v=${Date.now()}`);

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
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" onChange={e => this.handleInputChange('name', e.target.value)} value={this.state.name} />
              </FormGroup>
              <FormGroup>
                <Label for="template">Template</Label>
                <Input type="select" name="template" id="template" required onChange={e => this.handleInputChange('template', e.target.value)} value={this.state.template}>
                  {templates.map(template => (
                    <option value={template} key={template}>{template.toUpperCase()}</option>
                  ))}
                </Input>
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