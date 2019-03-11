import React, {Component} from 'react';
import {View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {connect} from 'react-redux';
import {memberUpdate} from '../actions';
import {CardSection, Input} from './common';

class MemberForm extends Component {
  render() {
    return (
      <View>
      <CardSection>
        <Input 
        label="Name"
        placeHolder="John Doe"
        value={this.props.name}
        onChangeText={text => this.props.memberUpdate({prop: 'name', value: text})} 
        />
      </CardSection>

      <CardSection>
        <Input 
        label="Phone "
        placeHolder="206-123-4567"
        value={this.props.phone}
        onChangeText={text => this.props.memberUpdate({prop: 'phone', value: text})} 
        />
      </CardSection>

      <CardSection>
        <Input 
        label="Address "
        placeHolder="1234 Main St"
        value={this.props.address}
        onChangeText={text => this.props.memberUpdate({prop: 'address', value: text})} 
        />
      </CardSection>
      
        <CardSection>
          <CheckBox
            style={{flex: 1}}
            leftText={"Driving?"}
            isChecked={this.props.driving}
            onClick={() => this.props.memberUpdate({prop:'driving', value: !this.props.driving})}
          />
        </CardSection>
      </View>
    );
  };
}

const mapStateToProps = (state) => {
    const {name, phone, address, driving} = state.memberForm;
    return {name, phone, address, driving};
}

export default connect(mapStateToProps, {memberUpdate})(MemberForm);