import axios from 'axios';

export const GET_ALL_TRACKS = 'GET_ALL_TRACKS';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

export function getAllTracks() {
    return dispatch => {
        axios.get('/getTracksData').then(res => {
            dispatch({
                type: GET_ALL_TRACKS,
                payload: res.data
            });
        });
    }
}

export function setCurrentTrack(id) {
    return {
        type: SET_CURRENT_TRACK,
        payload: id
    }
}