import { GET_ALL_TRACKS, SET_CURRENT_TRACK } from '../actions/trackActions';

const initialState = {
    tracks: [],
    currentTrack: null,
}

export function trackReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TRACKS:
            return {
                ...state,
                tracks: action.payload
            }

        case SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: state.tracks.find(item => item.id === action.payload)
            }

        default: 
            return state;
    }
}