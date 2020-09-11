import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Form, Button } from 'semantic-ui-react'
import Router from "next/router";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
      modalOpen: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };

    this.props.registerUser(newUser, this.props.history);
    if (!this.state.errors.length > 0) {
      this.setState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        errors: {}
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className={"registerForm"}>
        <Form>
          <Form.Input
            fluid
            label='Nom'
            placeholder='Nom'
            name='username'
            value={this.state.username}
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            label='E-mail'
            placeholder='E-mail'
            name='email'
            value={this.state.email}
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            label='mot de passe'
            placeholder='Mot de passe'
            type="password"
            name='password'
            value={this.state.password}
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            label='Confirmer mot de passe'
            placeholder='Confirmer mot de passe'
            name='confirm_password'
            type="password"
            value={this.state.confirm_password}
            onChange={this.onChange}
          />
        </Form>

        <div className={"btnGroup"}>
          <Button.Group attached='bottom'>
            <Button
              content="Créer mon compte"
              onClick={this.onSubmit}
              positive
              disabled={false}
            />
            <Button.Or text='ou' />
            <Button content="Déjà enregistré ?" onClick={() => Router.push('/login')} />
          </Button.Group>

          <style jsx>{`
            .registerForm{
              margin-top: 20px;
            }
            .btnGroup{
              margin: 20px 0px;
            }
          
          `}</style>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
