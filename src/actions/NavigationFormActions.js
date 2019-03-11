import {
    ADDRESS_ADD,
    ADDRESS_UPDATE
} from './types'

export const submitForm = () => {
    return(dispatch) => {
        dispatch({type: ADDRESS_ADD});
    }
}

export const addressUpdate = ({prop, value}) => {
    
    return {
        type: ADDRESS_UPDATE,
        payload: {prop, value}
    }
}