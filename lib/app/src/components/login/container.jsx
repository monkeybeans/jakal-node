import React from 'react';
import api from 'axios';
import { Message, Modal, Form, Divider, Button } from 'semantic-ui-react';
import './style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false,
      error: '',
      register: false,
    };
  }

  toggleRegister= () => {
    const { register } = this.state;

    this.setState({ register: !register, error: '' });
  }

  registerOrLogin = ({ target }) => {
    const { register } = this.state;

    const formFieldsToJson = (form, fields) => {
      const inputs = Array
        .from(form.querySelectorAll('input'))
        .filter(i => fields.includes(i.name));

      return inputs.reduce((j, f) => ({
        ...j,
        [f.name]: f.value,
      }), {});
    };

    if (!target.checkValidity()) { return Promise.reject(); }

    this.setState({ sending: true });

    const formJson = formFieldsToJson(target, ['username', 'password', 'email']);
    const path = register ? 'register' : 'authenticate';
    const url = `/jakal/${path}`;
    return api
      .post(url, formJson)
      .then(() => {
        window.location.assign('/jakal');
      })
      .catch((e) => {
        this.setState({
          sending: false,
          error: e && e.response && e.response.data && e.response.data.error,
        });
        console.error(`Post to ${url}, error: ${e}`);
      });
  }

  render() {
    const { sending, error, register } = this.state;

    return (
      <Modal open dimmer="blurring" styleName="root" size="tiny">
        <Modal.Header>Login or Register</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.registerOrLogin} error={!!error} loading={sending}>
            <Form.Input type="text" placeholder="Pick a username" required minLength="4" name="username" autoFocus />
            <Form.Input type="password" placeholder="Type a password" required minLength="6" name="password" />
            { register
              ? <Form.Input type="email" placeholder="Your email goes here" required name="email" />
              : null
            }
            <Message
              error
              header="Could not continue :/"
              content={error}
            />
            <Form.Button
              type="submit"
              positive
              fluid
              labelPosition="right"
              icon="checkmark"
              content="Hit Me"
            />
          </Form>
          <Divider horizontal>Or</Divider>
          <Button
            onClick={this.toggleRegister}
            fluid
            content={register ? 'Abort registration' : 'Register'}
            color="blue"
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default Login;
