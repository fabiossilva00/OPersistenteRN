import { combineReducers } from 'redux'

import { mainReducer } from './reducers/mainReducer'
import { realViewReducer } from './reducers/realmViewReducer'
import { mobileReducer } from './reducers/mobileReducer'
import { queueReducer } from './reducers/queueReducer'

export default combineReducers({
    mainReducer,
    realViewReducer,
    mobileReducer,
    queueReducer
})