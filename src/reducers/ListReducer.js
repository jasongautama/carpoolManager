import {
    ADD_MEMBER_LIST,
    REMOVE_MEMBER_LIST
} from '../actions/types'

export default (state = [], action) => {
    switch(action.type) {
        case ADD_MEMBER_LIST:
            var tempArr = [...state, action.payload.member]
            return tempArr
        case REMOVE_MEMBER_LIST:
            var newArr = state.filter(mem => mem.uid != action.payload.member.uid)
            return newArr
            
        default:
            return state
    }
} 
