import React, { useState } from 'react'
import { Container, Typography, IconButton } from '@material-ui/core';
import { NewTrackItem } from '../newTrackItem/NewTrackItem';
import { Box } from '@material-ui/core';
import { TrackData } from '../trackData/TrackData';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MessageIcon from '@material-ui/icons/Message';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

function TrackDetailsComponent(props) {
    const [isEditMode, setEditMode] = useState(false);
    const id = props.match.params.id;

    const classes = useStyles();

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
                        {props.track.name}
                    </Typography>
            </Box>
            <Box>
                {
                    isEditMode ? <NewTrackItem track={props.track.id} goBack={goBack} /> : <TrackData track={props.track} />
                }
            </Box>
        </Container>
    );

    return renderContent();
}

const mapStateToProps = (state, ownProps) => {
    const currentTrack = state.track.tracks.find(item => item.id === ownProps.match.params.id)
    return {track: currentTrack};
}

export const TrackDetails = connect(mapStateToProps)(TrackDetailsComponent);