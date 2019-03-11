import firebase from '@firebase/app'
import '@firebase/auth'
import {Actions} from 'react-native-router-flux'
import {
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

/**
 * desc: func. is called when user inputs email address
 * @param {string} text 
 */

export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

/**
 * desc: func. is called when user inputs password
 * @param {string} text 
 */
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

/**
 * desc: authenticate user to firebase.
 * defintion: dispatch = send action and trigger 
 * state changes to store
 * @returns call loginUserSuccess() if true
 *          call loginUserFail() if false
 * @param {string, string} user 
 */
export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch))
  };
}

/**
 * desc: dispatch loginUserSuccess and route to 
 * main (memberList)
 * @param {action} dispatch 
 * @param {UserCredential} user 
 */
const loginUserSuccess = (dispatch, user) => {
  console.log("successfull")
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user})
  Actions.main()
};

/**
 * desc: dispatch error message and re-prompt user 
 * to enter credentials
 * @param {action} dispatch 
 * @param {UserCredential} user 
 */
const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL})
};

