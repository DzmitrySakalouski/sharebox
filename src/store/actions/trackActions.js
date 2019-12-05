import axios from 'axios';
import { TOGGLE_PRELOADER } from './loader';

export const GET_ALL_TRACKS = 'GET_ALL_TRACKS';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

export function getAllTracks() {
    return dispatch => {
        dispatch({
            type: TOGGLE_PRELOADER,
            payload: true
        });
        axios.get('/getTracksData').then(res => {
            dispatch({
                type: GET_ALL_TRACKS,
                payload: res.data
            });
            dispatch({
                type: TOGGLE_PRELOADER,
                payload: false
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