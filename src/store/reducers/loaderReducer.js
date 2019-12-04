import { TOGGLE_PRELOADER } from '../actions/loader';
const initialState = {
    isLoading: false
}

export function preloaderReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_PRELOADER:
            return {
                isLoading: !state.isLoading
            }
    
        default:
            return state;
    }
}