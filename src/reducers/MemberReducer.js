import {
  MEMBERS_FETCH,
  MEMBERS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  address: '',
  loading: false,
  driving: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEMBERS_FETCH:
      return {...state, loading: true}
    case MEMBERS_FETCH_SUCCESS:
      console.log(action.payload)
      if (action.payload == null)
        return {...state, loading: false}
      return action.payload
    default:
      return state
  }

};
