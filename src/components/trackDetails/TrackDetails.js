import React, { useEffect, useState } from 'react'
import { Container, Typography, IconButton, Button } from '@material-ui/core';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import { NewTrackItem } from '../newTrackItem/NewTrackItem';
import { Box } from '@material-ui/core';
import { TrackData } from '../trackData/TrackData';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    title: {
        margin: '20px 0 10px 0',
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'space-etween',
        alignItems: 'center'
    }
})

export function TrackDetails(props) {
    const [track, setTrack] = useState({});
    const [isEditMode, setEditMode] = useState(false);
    const id = props.match.params.id;
    const db = firebase.firestore();

    const classes = useStyles();

    useEffect(() => {
        const documentRef = db.collection("tracks").doc(id);
        documentRef.get().then(doc => {
            if (doc.exists) {
                setTrack({ ...doc.data(), id });
            }
        })
    }, []);

    const goBack = () => {
        props.history.goBack();
    }

    const toggleEdit = () => {
        setEditMode(!isEditMode);
    }

    const renderContent = () => (
        <Container>
            <Box className={classes.titleBox}>
                <Box style={{ flexGrow: 1 }}>
                    <IconButton onClick={goBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                
                <Typography variant="h5" className={classes.title}>
                    {track.name}
                </Typography>

            </Box>
           
            <Box>
                <Button variant="contained" color="primary" onClick={toggleEdit}>Edit</Button>
                {
                    isEditMode ? <NewTrackItem goBack={goBack} track={track} /> : <TrackData track={track} />
                }
                
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