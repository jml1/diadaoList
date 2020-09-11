import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Form, Button } from 'semantic-ui-react';
import Router from "next/router";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className={"loginForm"}>
          <Form>
              <Form.Input
                fluid
                label='Email'
                placeholder='email'
                type="email"
                name="email"
                invalid={errors.email}
                value={this.state.email}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                label='Password'
                placeholder='password'
                type="password"
                invalid={errors.password}
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
          </Form>
          <div className={"btnGroup"}>
            <Button.Group attached='bottom'> 
              <Button content="Se connecter" onClick={(e) => this.onSubmit(e)} />
              <Button.Or text='ou' />
              <Button
                content="Créer un compte"
                onClick={() => Router.push('/register')}
                positive
                disabled={false}
              />
            </Button.Group>
          </div>

          <style jsx>{`
            .loginForm{
              margin-top: 20px;
            }
            .btnGroup{
              margin: 20px 0px;
            }
          
          `}</style>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
