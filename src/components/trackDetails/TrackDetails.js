import React, { useEffect, useState } from 'react'
import { Container, Typography, IconButton, Button } from '@material-ui/core';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import { NewTrackItem } from '../newTrackItem/NewTrackItem';
import { Box } from '@material-ui/core';
import { TrackData } from '../trackData/TrackData';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        margin: '20px 0 10px 0',
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'space-between',
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
                <Box style={{ flexBasis: 300, display: 'flex', padding: '10px 0', justifyContent: 'space-between' }}>
                    <IconButton onClick={goBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Link to={`/comments/${id}`}>
                        <IconButton>
                            <MessageIcon />
                        </IconButton>
                    </Link>
                    
                    <IconButton onClick={toggleEdit}>
                        {isEditMode ? <ViewListIcon/> : <EditIcon />}
                    </IconButton>
                </Box>
                    <Typography variant="h5" className={classes.title}>
                        {track.name}
                    </Typography>
            </Box>
            <Box>
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