import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { GridListTile, Box } from '@material-ui/core';
import { TrackCard } from '../trackCard/TrackCard';
import Loader from 'react-loader-spinner';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAllTracks, setCurrentTrack } from '../../store/actions/trackActions';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width: '100 vw'
    },
    gridList: {
        width: "100%",
        padding: 20,
    },
    tile: {
        height: 300
    },
    box: {
        position: 'fixed',
        bottom: 10,
        right: 10
    }
}));

function AllTracksTableComponent(props) {
    const classes = useStyles();
    const {tracks} = props;

    useEffect(() => {
        props.getTracks()
    }, [])

    const renderLoader = () => {
        return (
            <div style={{ height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <Link to="/new_track" style={{ textDecoration: 'none' }}>
                    <IconButton color="primary">
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Link>
            </Box>
            {
                tracks && tracks.length > 0 ?

                    <GridList className={classes.gridList} cols={3}>
                        {tracks.map(tile => (
                            <GridListTile key={tile.id} style={{ height: 'auto' }}>
                                <TrackCard {...tile} {...props} />
                            </GridListTile>
                        ))}
                    </GridList> : renderLoader()
            }
        </div>
    );
}

const mapStateToProps = state => ({ tracks: state.track.tracks });

const mapDispatchToProps = ({
    getTracks: getAllTracks,
    setCurrentTrack
});

export const AllTracksTable = connect(mapStateToProps, mapDispatchToProps)(AllTracksTableComponent);