import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@material-ui/core';
import { DropzoneComponent } from '../dropzone/Dropzone';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase'; // TODO add storage
import Loader from 'react-loader-spinner';

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
    const storage = firebase.storage();
    const firestore = firebase.firestore();
    const classes = useStyles();
    const [file, setFile] = useState({
        size: "",
        name: "",
    });

    const [isMediaLoading, setMediaLoading] = useState(false);
    const [isInstanceLoading, setInstanceLoading] = useState(false);

    const [comment, setComment] = useState('');

    const handleFileDrop = fileData => {
        setFile(fileData[0]);
    }

    const uploadFile = () => {
        setMediaLoading(true);
        setInstanceLoading(true);
        const {id} = props.track;
        const ref = storage.ref();
        const dataRef = ref.child(`${props.type}/${file.name}`);

        const currentMediaItems = props.track[props.type];
        const docRef = firestore.collection('tracks').doc(id);
        const params = {
            updatedAt: new Date(),
            [props.type]: [...currentMediaItems, { name: file.name, uploadedAt: new Date(), ref: `${props.type}/${file.name}` }]
        }
        if(comment) {
            params.comments = [...props.track.comments, {
                creator: props.track.creator,
                text: comment
            }]
        };

        const f1 = dataRef.put(file);
        const f2 = docRef.update({
            ...params
        });

        Promise.all([f1, f2]).then(() => {
            setInstanceLoading(false);
            setMediaLoading(false);
            props.goBack();
        })
    }

    const renderLoader = () => {
        return (
            <div style={{ height: 350, display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
            </div>
        );
    };

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
        isInstanceLoading || isMediaLoading ? renderLoader() : renderContent()
    )
}