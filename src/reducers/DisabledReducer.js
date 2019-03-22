import { 
    ENABLE_BUTTON, 
    DISABLE_BUTTON 
} from '../actions/types';


export default (state = true, action) => {
    switch (action.type) {
        case ENABLE_BUTTON:
            //if list is still empty, keep disable the button
            if (action.payload === undefined) return true

            //if 2 or more members, the enable the button
            if (action.payload.length > 0) return false 
            
            return true

        case DISABLE_BUTTON:
            var curState = (action.payload.length <= 2) ? true : false
            return curState

        default:
            return state

    }
}