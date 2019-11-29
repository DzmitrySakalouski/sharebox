import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AllTracksTable } from '../allTracksTable/allTracksTable';
import { NewTrackForm } from '../newTrackForm/NewTrackForm';

export class Home extends React.Component {
    render() {
        return (
            // <Container>
                <Switch>
                    <Redirect exact from="/" to="/all_tracks"><AllTracksTable /></Redirect>
                    <Route path="/new_track" exact render={props => (<NewTrackForm {...props}/>)} />
                    <Route path="/all_tracks"><AllTracksTable /></Route>
                </Switch>
            // </Container>
        );
    }
}