import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { DropzoneComponent } from '../dropzone/Dropzone';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toggleLoader } from '../../store/actions/loader';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
    },
});

const TrackEditFormComponent = (props) => { 
    const storage = firebase.storage();
    const classes = useStyles();
    const [file, setFile] = useState({
        size: "",
        name: "",
    });

    const [comment, setComment] = useState('');

    const handleFileDrop = fileData => {
        setFile(fileData[0]);
    }

    const uploadFile = () => {
        props.toggleLoader(true);
        const id = props.trackId;
        const ref = storage.ref();
        const dataRef = ref.child(`${props.type}/${file.name}`);

        const params = {
            updatedAt: new Date(),
            type: props.type,
            media: { name: file.name, uploadedAt: new Date(), ref: `${props.type}/${file.name}` }
        }
        if(comment) {
            params.comment = {
                creator: props.track.creator,
                text: comment
            }
        };

        const f1 = dataRef.put(file);
        const f2 = Axios.post('/sendMedia', params)

        Promise.all([f1, f2]).then(() => {
            props.toggleLoader(false);
            props.goBack();
        })
    }

    const renderContent = () => (
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
                    value={comment}
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined" />
                <Button onClick={uploadFile} disabled={!file.name} style={{ flexGrow: 1 }} variant="outlined">Сохранить</Button>
            </Box>
        </Box>
    );

    return (
        renderContent()
    )
}

const mapDispatchToProps = dispatch => ({toggleLoader: (isLoading) => dispatch(toggleLoader(isLoading))});

export const TrackEditForm = connect(null, mapDispatchToProps)(TrackEditFormComponent);
