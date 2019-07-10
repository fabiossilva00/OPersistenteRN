import { 
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILURE
} from '../typesAction/mainTypes';

const initialState = {
    isLoading: false,
    relatarProblema: '',
    errorMessage: ''
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOADING: 
            return {
                ...state,
                isLoading: action.payload,
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: action.loading,
                relatarProblema: action.payload,
                errorMessage: ''
            }
        case REQUEST_FAILURE:
            return {
                ...state,
                isLoading: action.loading,
                errorMessage: action.payload,
                relatarProblema: ''
            }
        default:
            return state
    };
};

export const fetchLoading = () =>  {
    return {
        type: REQUEST_LOADING,
        payload: true,
    }
};

export const fetchFailure = message => {
    return {
        type: REQUEST_FAILURE,
        payload: message,
        loading: false,
    }
};

export const fetchSuccess = relatarProblema => {
    return {
        type: REQUEST_SUCCESS,
        payload: relatarProblema,
        loading: false,
    }
};