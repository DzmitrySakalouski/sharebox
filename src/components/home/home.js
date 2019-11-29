import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AddNewTrack } from  '../addTrack/addTrack';
import { AllTracksTable } from '../allTracksTable/allTracksTable';

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Switch>
                    <Redirect exact from="/" to="/all_tracks"><AllTracksTable /></Redirect>
                    <Route path="/new_track" exact><AddNewTrack /></Route>
                    <Route path="/all_tracks"><AllTracksTable /></Route>
                </Switch>
        );
    }
}