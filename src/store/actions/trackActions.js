import axios from 'axios';

export const GET_ALL_TRACKS = 'GET_ALL_TRACKS';

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