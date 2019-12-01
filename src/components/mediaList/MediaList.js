import React from 'react';
import { Box, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '12px 0'
    }
})

export function MediaList(props) {
    const classes = useStyles();
    const {items} = props;

    return (
        <Box className={classes.root}>
            {
                items.map(item => {
                    return (
                        <React.Fragment>
                            <Box className={classes.item}>
                                <Typography>{item.name}</Typography>
                                <Button variant="contained" color="primary">Скачать</Button>
                            </Box>
                            <Divider />
                        </React.Fragment>
                    )
                })
            }
        </Box>
    );
}