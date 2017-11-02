import React from 'react';
import P from 'prop-types';
import { Form, TextArea, Button, Message } from 'semantic-ui-react';
import FormField from './FormField';


const isMinLength = (length, msg) => (v) => {
  const valid = v && v.length >= length;

  return valid ? null : msg;
};

const newName = () => new FormField({
  validator: isMinLength(2, 'The name must be at least 2 characters long'),
});

const newDescription = () => new FormField({
  validator: isMinLength(10, 'Description must be at least 10 characters long'),
});

export default class AddSuggestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      sending: false,
      name: newName(),
      description: newDescription(),
    };
  }

  reset = () => {
    this.setState({
      showInput: false,
      sending: false,
      name: newName(),
      description: newDescription(),
    });
  }

  onCancel = () => {
    this.reset();
  }

  onSend = () => {
    const { name, description } = this.state;

    if (this.validateSuggestion()) {
      this.setState({ sending: true });
      this.props.onSend({
        name: name.val,
        description: description.val,
      });

      setTimeout(() => {
        this.reset();
      }, 2500);
    }
  }

  toggleInput = () => {
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  validateSuggestion() {
    const [name, description] = ['name', 'description']
      .map(n => this.state[n].doTouch());

    this.setState({ ...name, ...description });

    return (name.msg === null && description.msg === null);
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({
      [name]: { ...this.state[name].set(value) },
    });
  }

  handleOnBlur = ({ target: { name } }) => {
    this.setState({
      [name]: { ...this.state[name].doTouch() },
    });
  }

  renderInput = () => {
    const { name, description, sending } = this.state;
    const error = !!(name.msg || description.msg);
    return (
      <Form error={error} loading={sending} >
        <Form.Input
          name="name"
          label="Your favourite suggestion goes here"
          type="text"
          value={name.val}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          placeholder="Name of the suggestion"
        />
        <TextArea
          name="description"
          value={description.val}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          rows={10}
          placeholder="A short description why this gonna win"
        />
        <Message
          error
          header="You are missing a few things..."
          list={[
            name.msg,
            description.msg,
          ]}
        />
        <Button.Group widths="2">
          <Button secondary onClick={this.onCancel}>Cancel</Button>
          <Button primary onClick={this.onSend}>Send</Button>
        </Button.Group>
      </Form>
    );
  }

  render() {
    return (
      <div>
        <Button fluid primary onClick={this.toggleInput}>+ Add a Suggestion</Button>
        { this.state.showInput ? this.renderInput() : null }
      </div>
    );
  }
}

AddSuggestion.propTypes = {
  onSend: P.func.isRequired,
};
