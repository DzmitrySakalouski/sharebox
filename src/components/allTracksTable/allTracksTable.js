import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { GridListTile } from '@material-ui/core';

const items = [
    {
        id: 1,
        name: "Death track",
        creator: "DS",
        createdAt: new Date(2019, 7, 12),
        apdatedAt: new Date(2019, 8, 14)
    },
    {
        id: 2,
        name: "Ballad track",
        creator: "DS",
        createdAt: new Date(2019, 9, 4),
        apdatedAt: new Date(2019, 8, 12)
    },
    {
        id: 3,
        name: "First track",
        creator: "SS",
        createdAt: new Date(2019, 10, 11),
        apdatedAt: new Date(2019, 9, 12)
    },
    {
        id: 4,
        name: "Second track",
        creator: "DS",
        createdAt: new Date(2019, 10, 12),
        apdatedAt: new Date(2019, 7, 12)
    },
    {
        id: 5,
        name: "Dos track",
        creator: "SS",
        createdAt: new Date(2019, 10, 22),
        apdatedAt: new Date()
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        height: '200px',
        width: '100 vw'
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

export function AllTracksTable(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {items.map(tile => (
                    <GridListTile key={tile.id}>
                        <h1 style={{ color: 'red'}}>{tile.name}</h1>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}