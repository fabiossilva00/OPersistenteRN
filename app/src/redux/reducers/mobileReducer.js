import {
    STATUS_INTERNET
} from '../typesAction/mobileTypes'

const initialState = {
    isConnect: false
}

export const mobileReducer = (state = initialState, action) => {
    switch(action.type) {
        case STATUS_INTERNET:
            return {
                ...state,
                isConnect: action.payload
            }
        default:
            return state
    }
}

export const statusInternet = internet => {
    return {
        type: STATUS_INTERNET,
        payload: internet
    }
}