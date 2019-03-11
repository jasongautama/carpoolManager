/**
 * Action is sent to all of the reducers (in this case one only)
 */
import {EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: '', 
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
  
  // ...state - take all the existing state
  switch (action.type) {
    case EMAIL_CHANGED:
      return{ ...state, email: action.payload}; //replaced/rewrite on top of the state object
    case PASSWORD_CHANGED:
      return{ ...state, password: action.payload};
    case LOGIN_USER:
      return { ...state, loading: true, error: ''}
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload};
      // the ...INITIAL_STATE means that reset all the attributes to default value
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: 'Authentication Failed.', password: ''}
    default:
      return state;
  }
};