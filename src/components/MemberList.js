import React, {Component} from 'react'
import {FlatList, View} from 'react-native'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import {CardSection, Spinner, Button} from '../components/common'
import {membersFetch, clearList} from '../actions'
import MyList from './MyList'

class MemberList extends Component {

  componentWillMount() { 
    this.props.membersFetch()
   }

  onRowPress() { 
    Actions.memberEdit({members: this.props.members}) 
  }

  onClickNavigate() {
    Actions.navigationForm({waypoints: this.props.list})
  }

  _renderItem({item}) {
    if (!(item.name == undefined))
      return <MyList members={item}/> }

  _keyExtractor = (members) => members.uid
 
  render() {
    const {members} = this.props

    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <FlatList style={styles.listStyle}
          data={members.sort((a, b) => {
            if (!(a.name == undefined)) {
              return a.name.localeCompare(b.name)
            }})
          }
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          /> 

          <View style={styles.containerBtn}>
            <Button onPress={this.onClickNavigate.bind(this)}
                disabled={this.props.disable}
                style = {styles.fillBtnStyle}> 
              Navigate 
            </Button>
          </View>

          <View style={styles.paddingBtm} />
        </View>

      )
    }  
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  listStyle: {
    flex:0.8
  },
  containerBtn: {
    flex: 0.1,
    flexDirection: 'row'
  },
  paddingBtm: {
    flex: 0.025
  },
  fillBtnStyle: {
    backgroundColor: '#FFC232',
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  }

}

const mapStateToProps = (state) => {
  var result = _.toPairs(state.members)

  var members = []
  for (var i = 0; i < result.length; i++) {
    var member = result[i][1]
    const uid = result[i][0]

    member.uid = uid
    members.push(member)
  }

 //WORKING ON IOS, BUT NOT ON ANDROID
  /*
  const members = _.map(state.members, (val, uid) => {
    // Android --"TypeError: requested keys of a value that is not an object"
    return {...val, uid} 
  })
  */
  
  const {loading} = state.members
  const list = state.list
  const disable = state.disabled
  return {
    members,
    loading,
    list,
    disable
  }
}

export default connect(mapStateToProps, {clearList, membersFetch}) (MemberList)