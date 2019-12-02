import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AllTracksTable } from '../allTracksTable/allTracksTable';
import { NewTrackForm } from '../newTrackForm/NewTrackForm';
import { TrackDetails } from '../trackDetails/TrackDetails';
import { Comments } from '../comments/Comments';

export class Home extends React.Component {
    render() {
        return (
            <Switch>
                <Redirect exact from="/" to="/all_tracks"><AllTracksTable /></Redirect>
                <Route path="/new_track" exact render={props => (<NewTrackForm {...props}/>)} />
                <Route path="/all_tracks"render={props => (<AllTracksTable {...props}/>)} />
                <Route path="/track/:id" render={props => (<TrackDetails {...props}/>)} />
                <Route path="/comments/:id" render={props => (<Comments {...props}/>)} />
            </Switch>
        );
    }
}