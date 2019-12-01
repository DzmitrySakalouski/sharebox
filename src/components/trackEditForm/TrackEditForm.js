import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { DropzoneComponent } from '../dropzone/Dropzone';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase'; // TODO add storage

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
    },
});

export const TrackEditForm = (props) => {
    const classes = useStyles();
    const [file, setFile] = useState({
        size: "",
        name: "",
    });

    const handleFileDrop = fileData => {
        console.log(fileData);
        setFile(fileData[0]);
    }

    return (
        <Box className={classes.root}>
            <DropzoneComponent onDropFile={handleFileDrop} />
            <Box style={{ marginLeft: 20, display: 'flex', flexDirection: 'column' }}>
                <Typography>
                    Name: {file.name}
                </Typography>
                <Typography>
                    Size: {file.size}
                </Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Коммент"
                    multiline
                    rowsMax="4"
                    value=""
                    className={classes.textField}
                    margin="normal"
                    variant="outlined" />
                <Button style={{ flexGrow: 1 }} variant="outlined">Сохранить</Button>
            </Box>
        </Box>
    )
}