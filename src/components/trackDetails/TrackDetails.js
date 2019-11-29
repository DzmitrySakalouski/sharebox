import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@material-ui/core';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import { NewTrackItem } from '../newTrackItem/NewTrackItem';
import { Box } from '@material-ui/core';

export function TrackDetails(props) {
    const [track, setTrack] = useState({});
    const id = props.match.params.id;
    const db = firebase.firestore();

    useEffect(() => {
        const documentRef = db.collection("tracks").doc(id);
        documentRef.get().then(doc => {
            if (doc.exists) {
                setTrack({ ...doc.data() });
            }
        })
    }, []);

    const renderContent = () => (
        <Container>
            <Typography>
                {track.name}
            </Typography>
            <Box>
                <NewTrackItem />
            </Box>
            
        </Container>
    );
    const renderLoader = () => {
        return (
            <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
            </div>
        );
    };

    return track ? renderContent() : renderLoader();
}