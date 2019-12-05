import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MediaList } from '../mediaList/MediaList';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '20px 0 20px 0'
    },
    mediaContainer: {
        width: '40%'
    },
    mediaTitle: {
        marginBottom: 25
    }
});

export function TrackData(props) {
    const classes = useStyles();
    const {track} = props;

    return (
        <Box className={classes.root}>
            <Box className={classes.mediaContainer}>
                <Typography variant="h6">
                    Demos
                </Typography>
                { track && track.demos && <MediaList items={track.demos} /> }
            </Box>
            <Container className={classes.mediaContainer}>
                <Typography variant="h6">
                    Tabs
                </Typography>
                { track && track.gtp && <MediaList items={track.gtp} /> }
            </Container>
        </Box>
    );
}