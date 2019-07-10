import { REQUEST_LOADING } from '../typesAction/mainTypes'

const initialState = {
    isLoading: false
}

export const mainReducer = (state = initialState, action) => {
    switch (action) {
        case REQUEST_LOADING: 
        return {
            ...state
        }
        default:
            return state
    }
}
