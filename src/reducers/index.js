import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import MemberFormReducer from './MemberFormReducer'
import MemberReducer from './MemberReducer'
import NavigationFormReducer from './NavigationFormReducer'
import ListReducer from './ListReducer'
import DisabledReducer from './DisabledReducer'

//Redux trail: 1st - combineReducer
export default combineReducers({
    auth: AuthReducer,
    memberForm: MemberFormReducer,
    members: MemberReducer,
    navigationForm: NavigationFormReducer,
    list: ListReducer,
    disabled: DisabledReducer
});