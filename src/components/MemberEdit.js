import React, {Component} from 'react'
import {View} from 'react-native';
import {connect} from 'react-redux'
import _ from 'lodash'
import {Actions} from 'react-native-router-flux'
import {CardSection, Button} from './common'
import {memberSave, memberUpdate, memberDelete} from '../actions'
import MemberForm from './MemberForm'

class MemberEdit extends Component {

  state = {error: false};

  componentWillMount() {
        _.each(this.props.members, (value, prop) => {
        this.props.memberUpdate({prop, value})
    });
  }

    onSavePress() {
        const {name, phone, address, driving} = this.props

        if (name == "" || phone == "" || address == "") {
            this.setState({error: true});
            return;
        }
        this.setState({error:false})
        this.props.memberSave({name, phone, address, driving, uid: this.props.members.uid})
    }

    onDeletePress() {
        this.props.memberDelete({uid: this.props.members.uid})
    }

    onNavPress() {
        Actions.navigationForm({member: this.props.members, waypoints: []})
    }

    saveButton() {
        return (
            <Button onPress={this.onSavePress.bind(this)}> 
                Save Changes 
            </Button>
        );
    }
    deleteButton() {
        return (
            <Button onPress={this.onDeletePress.bind(this)}>
                Delete Member
            </Button>
        )
    }

    navigateButton() {
        return (
            <Button onPress={this.onNavPress.bind(this)}> 
                NAVIGATE
            </Button> 
        );       
    }

    render() {
      return (
        <View>
            <MemberForm {...this.props} />
            <CardSection>
                
            </CardSection>
            <CardSection>
                {this.saveButton()}
            </CardSection>
                
            <CardSection>
                {this.navigateButton()}
            </CardSection>

            <CardSection>
                {this.deleteButton()}
            </CardSection>
            
        </View>    
      );   
    }
}

const mapStateToProps = (state) => {
    const {name, phone, address, driving} = state.memberForm

    return {name, phone, address, driving}
}

export default connect(mapStateToProps, {memberSave, memberUpdate, memberDelete}) (MemberEdit);