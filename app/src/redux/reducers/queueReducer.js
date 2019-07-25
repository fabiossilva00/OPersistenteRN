const START_QUEUE = 'START_QUEUE'
const FINISH_QUEUE = 'FINISH_QUEUE'

const initialState = {
    queueStart: false
}

export const queueReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_QUEUE:
            console.log('Start queue', action)
            return {
                ...state,
                queueStart: action.payload
            }
         case FINISH_QUEUE:
             return {
                 ...state,
                 queueStart: action.payload
             }
        default:
            return state
    }
}

export const startService = () => {
    return {
        type: START_QUEUE,
        payload: true
    }
}

export const finishService = () => {
    return {
        type: FINISH_QUEUE,
        payload: false
    }
}