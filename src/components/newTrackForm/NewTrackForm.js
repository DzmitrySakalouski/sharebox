import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    menuButton: {
        marginRight: theme.spacing(2),
        backgroundColor: 'white',
        padding: 4
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: '20px'
    }
}));

export function NewTrackForm(props) {
    const classes = useStyles();
    const [name, setName] = useState('');

    const handleCancel = () => {
        props.history.push('/');
    }

    const handleSave = () => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore().collection('tracks');
        const params = {
            createdAt: new Date(),
            updatedAt: new Date(),
            creator: user.displayName,
            name,
            demos: [],
            gtp: [],
            comments: []
        }

        db.add(params).then(() => {
            props.history.push('/');
        });
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h5">
                Создать новый трек
            </Typography>
            <TextField
                className={classes.formControl}
                label="Название"
                id="outlined-margin-none"
                defaultValue={name}
                fullWidth
                onChange={e => setName(e.target.value)}
                variant="outlined"
            />
            <Button className={classes.formControl} color="primary" variant="contained" onClick={handleSave}>
                Создать
            </Button>
            <Button className={classes.formControl} color="secondary" variant="contained" onClick={handleCancel}>
                Отмена
            </Button>
        </Container>
    );
}