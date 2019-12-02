import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Link, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        margin: '12px 0'
    },
    title: {
        flexGrow: 1
    }
})

export function MediaList(props) {
    const classes = useStyles();
    const { items } = props;
    const [blob, setBlob] = useState(null);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const storage = firebase.storage().ref();
    const [open, setOpen] = React.useState(false);

    console.log(props.onFileDownload, "<==")

    const handleDownloadFile = (ref, name) => {
        setIsLoading(true);
        storage.child(ref).getDownloadURL().then(url => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
                const blobUrl = URL.createObjectURL(blob);
                setBlob(blobUrl);
                setIsLoading(false);
                setOpen(true);
                setName(name);
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch(err => console.log(err));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const renderModal = () => (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Скачать файл: {name} ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
            </Button>
                {blob && <a href={blob} download={name}>
                    <Button onClick={handleClose} color="primary">
                        Скачать
                </Button>
                </a>}

            </DialogActions>
        </Dialog>
    );

    const renderLoader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
            </div>
        );
    }

    return (

        isLoading ? renderLoader() :

            (<Box className={classes.root}>
                {renderModal()}
                {
                    items.map(item => {
                        return (
                            <React.Fragment>
                                <Box className={classes.item}>
                                    <Typography className={classes.title}>{item.name}</Typography>
                                    <Button onClick={() => handleDownloadFile(item.ref, item.name)}
                                        variant="contained" color="primary">Скачать</Button>
                                </Box>
                                <Divider />
                            </React.Fragment>
                        )
                    })
                }
            </Box>)
    );
}