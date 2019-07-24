import {
    VALORES_QUEUE
} from '../typesAction/realmViewTypes'

const initialState = {
    queueRequest: [],
}

export const realViewReducer = (state = initialState, action) => {
    switch(action.type) {
        case VALORES_QUEUE:
            return {
                ...state,
                queueRequest: action.payload
            }
        default:
            return state
    }
}

export const pegaValoresQueueOffline = queue => {
    return {
        type: VALORES_QUEUE,
        payload: queue
    }
}