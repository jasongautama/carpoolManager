import { 
    ENABLE_BUTTON, 
    DISABLE_BUTTON 
} from '../actions/types';


export default (state = true, action) => {
    switch (action.type) {
        case ENABLE_BUTTON:
            //console.log(action.payload)
            //if list is still empty, keep disable the button
            if (action.payload === undefined) return true

            //if 2 or more members, the enable the button
            if (action.payload.length > 0) return false 
            
            return true

        case DISABLE_BUTTON:
            //console.log(`in Disable_btn Reducer ${action.payload}`)
            console.log(action.payload.length)
            var curState = (action.payload.length <= 2) ? true : false
            if (curState)
                console.log('true')
            else
                console.log('false')

            return curState

        default:
            return state

    }
}