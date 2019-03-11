import {
    ADD_MEMBER_LIST,
    REMOVE_MEMBER_LIST
} from './types'

//insert the object if possible
export const addMember = ({member}) => {
    return {
        type: ADD_MEMBER_LIST,
        payload: {member}
    }
}

export const removeMember = ({member}) => {
    return {
        type: REMOVE_MEMBER_LIST,
        payload: {member}
    }
}