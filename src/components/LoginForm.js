import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {Card, CardSection, Input, Button, Spinner} from './common'
import {emailChanged, passwordChanged, loginUser} from '../actions'

class LoginForm extends Component {
  //the below 3 functions called the func. in Index.js
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
    const {email, password} = this.props;

    this.props.loginUser({email, password});
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );}
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
      Login
      </Button>
    );
  }

  // password need to be at least 6 characters
  render() {
    return (
      <Card>
        <CardSection>
            <Input
            label='Email'
            placeHolder='email@gmail.com' 
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            />
        </CardSection>

        <CardSection>
          <Input
          secureTextEntry
          label='Password'
          placeHolder='password'
          onChangeText={this.onPasswordChange.bind(this)} 
          value={this.props.password}/>
        </CardSection>

        {this.renderError()}

        <CardSection>
            {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return {
        email: email,
        password: password,
        error:error,
        loading:loading
    };
};

export default connect(mapStateToProps, {
  emailChanged, 
  passwordChanged,
  loginUser})(LoginForm);
