import {
    ADDRESS_UPDATE,
    ADDRESS_ADD
} from '../actions/types';

const INITAL_STATE = {
    origin: '',
    destination: '' 
}

export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case ADDRESS_UPDATE:
            return ({...state, [action.payload.prop]:action.payload.value});
        case ADDRESS_ADD:
            return INITAL_STATE
        default:
            return state
    }
};
