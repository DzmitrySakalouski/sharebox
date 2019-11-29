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

const items = [
    {
        id: 1,
        name: "Death track",
        creator: "DS",
        createdAt: new Date(2019, 7, 12),
        apdatedAt: new Date(2019, 8, 14),
        demos: [2],
        gtp: [2, 2, 2]
    },
    {
        id: 2,
        name: "Ballad track",
        creator: "DS",
        createdAt: new Date(2019, 9, 4),
        apdatedAt: new Date(2019, 8, 12),
        demos: [],
        gtp: [2, 2, 2, 2, 2, 2, 2]
    },
    {
        id: 3,
        name: "First track",
        creator: "SS",
        createdAt: new Date(2019, 10, 11),
        apdatedAt: new Date(2019, 9, 12),
        demos: [],
        gtp: [2, 2, 2, 2]
    },
    {
        id: 4,
        name: "Second track",
        creator: "DS",
        createdAt: new Date(2019, 10, 12),
        apdatedAt: new Date(2019, 7, 12),
        demos: [1, 2, 3, 4, 5],
        gtp: [2, 2]
    },
    {
        id: 5,
        name: "Dos track",
        creator: "SS",
        createdAt: new Date(2019, 10, 22),
        apdatedAt: new Date(),
        demos: [1, 5],
        gtp: [2]
    }
];

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

export function AllTracksTable(props) {
    const classes = useStyles();
    const db = firebase.firestore();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        db.collection('tracks').get().then(querySnapshot => {
            console.log(querySnapshot);
            const items = [];
            querySnapshot.forEach(doc => {
                console.log("doc=>", doc.data());
                items.push(doc.data());
            });

            setTracks(items);
        });
    }, [])

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
                            <GridListTile style={{ height: 'auto' }}>
                                <TrackCard {...tile} />
                            </GridListTile>
                        ))}
                    </GridList> : <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
            }
        </div>
    );
}