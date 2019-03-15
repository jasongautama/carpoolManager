import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {CardSection, Button} from './common';
import {clearMemberForm, memberCreate, memberUpdate} from '../actions';
import MemberForm from './MemberForm';

class MemberCreate extends Component {

    state = {error: false};

    componentWillMount() {
        this.props.clearMemberForm();
    }

    onButtonPress() {
        const {name, phone, address, driving} = this.props;
        if (name == "" || phone == "" || address == "") {
            this.setState({error: true});
            return;
        }
        this.setState({error:false});
        this.props.memberCreate({name, phone, address, driving});
    }

    renderError() {
        if (this.state.error) {
            return(
            <View style={{BackgroundColor: 'white'}}>
                <Text style={styles.errorTextStyle}>
                    Field(s) cannot be empty!
                </Text>
            </View>
            );
        }
    }

    renderButton() {
      return (
        <Button onPress={this.onButtonPress.bind(this)}> 
            Add 
        </Button>
      );
    }

    render() {
      return (
        <View>
            <MemberForm {...this.props} />
            {this.renderError()}
            <CardSection>
                {this.renderButton()}
            </CardSection>
            
        </View>    
      );
        
    }
}

const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red',
      BackgroundColor: 'white'
    }
}

//getting the data from memberForm and make it as a props
const mapStateToProps = (state) => {
  const {name, phone, address, driving} = state.memberForm;
  return {name, phone, address, driving}
}

export default connect(mapStateToProps, 
    {clearMemberForm, memberCreate, memberUpdate})(MemberCreate);