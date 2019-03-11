import {
    MEMBER_CREATE,
    MEMBER_DELETE,
    MEMBER_UPDATE,
    MEMBER_SAVE_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    phone: '',
    address: '',
    driving: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEMBER_UPDATE:
      return ({...state, [action.payload.prop]: action.payload.value})

    case MEMBER_CREATE:
      return INITIAL_STATE
    
    case MEMBER_SAVE_SUCCESS:
      return INITIAL_STATE
    
    // let's test if this can be deleted
    case MEMBER_DELETE:
      return INITIAL_STATE

    default:
      return state
  }
};
