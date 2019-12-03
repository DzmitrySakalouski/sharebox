import { GET_ALL_TRACKS } from '../actions/trackActions';

const initialState = {
    tracks: []
}

export function trackReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TRACKS:
            return {
                tracks: action.payload
            }

        default: 
            return state;
    }
}