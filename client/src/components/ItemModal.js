import React, { Component } from 'react';
import {
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
//import Home_image from '../development-skill.png';
console.log(Home_image);
class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    description: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      description: this.state.description
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add an Idea
          </Button>
        ) : (
          <Media>
          <Media heading>{`Please log in to manage idea\n`}</Media>
          <img src={ require('../development-skill.png') } />
          </Media>
           )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a new dev idea</ModalHeader>
          <ModalBody>                   
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add idea title'
                  onChange={this.onChange}
                />
                <Label for='description'>Description</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='Add a brief description'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem}
)(ItemModal);
