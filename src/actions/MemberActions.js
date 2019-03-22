import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import {Actions} from 'react-native-router-flux' //Router
import _ from 'lodash'
import {MEMBER_CREATE, 
  MEMBER_DELETE,
  MEMBER_UPDATE,
  MEMBERS_FETCH_SUCCESS,
  MEMBERS_FETCH,
  MEMBER_SAVE_SUCCESS
} from './types'

export const memberCreate = ({name, phone, address, driving}) => {
  const {currentUser} = firebase.auth()
  
  return (dispatch) => {
    dispatch({type: MEMBER_CREATE})
    
    Actions.memberList({type: 'reset'}) //route back to memberList Scene and reset the content
    
    firebase.database().ref(`/users/${currentUser.uid}/members`)
      .push({name, phone, address, driving})
      .then(() => {
          dispatch({type: MEMBER_CREATE})
          Actions.memberList({type: 'reset'}) //route back to memberList Scene and reset the content
    
      }) //reset in order to remove back button 
    
    };

};

export const memberDelete = ({uid}) => {
  const {currentUser} = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/members/${uid}`)
    .remove()
    .then(
      Actions.memberList({type: 'reset'})
    )
    dispatch({type: MEMBER_DELETE})
  }
};

export const memberUpdate = ({prop, value}) => {
  
  return {
    type: MEMBER_UPDATE,
    payload: {prop, value}
  }
};

export const membersFetch = () => {
  const {currentUser} = firebase.auth()

  return (dispatch) => {
    dispatch({type: MEMBERS_FETCH}) // change the state where it sets loading:true in MemberReducer
    firebase.database().ref(`/users/${currentUser.uid}/members/`)
    .on('value', snapshot => {
      dispatch({type: MEMBERS_FETCH_SUCCESS, payload: snapshot.val()})
    })
  }
};

export const memberSave = ({name, phone, address, driving, uid}) => {
  const {currentUser} = firebase.auth()

  return(dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/members/${uid}`)
      .set({name, phone, address, driving})
      .then(() => {
        dispatch({type: MEMBER_SAVE_SUCCESS})
        Actions.memberList({type: 'reset'})
      })
  }
};

export const clearMemberForm = () => {
  return(dispatch) => {
    dispatch({type: MEMBER_CREATE})
  }
}
