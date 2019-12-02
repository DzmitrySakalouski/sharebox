import React from 'react'
import { Box, Typography, Avatar, Divider, makeStyles } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles({
    box: {
        display: 'flex',
        padding: '10px 0',
        alignItems: 'center'
    },
    text: {
        marginLeft: '10px',
    }
});

export const Comment = props => {
    const classes = useStyles();

    const getCreator = creator => {
        const strs = creator.split(' ');
        return `${strs[0][0]}${strs[1][0]}`;
    }

    return (
        <Box className={classes.boxContainer}>
            <Box className={classes.box}>
                <Avatar>{getCreator(props.creator)}</Avatar>
                <Typography className={classes.text}>
                    {props.text}
                </Typography>
            </Box>
            
            <Divider />
        </Box>
    );
}