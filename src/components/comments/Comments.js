import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import firebase from 'firebase';
import { Comment } from '../comment/comment';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0'
    },
    backBtn: {
        flexGrow: 1
    },
    footer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

const CommentsComponent = (props) => {
    const [allComments, setAllComments] = useState([]);
    const [text, setText] = useState('');
    const id = props.match.params.id;
    const db = firebase.firestore();    

    const classes = useStyles();

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        axios.put('/getAllTrackComments', { key: props.currentTrack.id }).then(res => setAllComments(res.data));
    }

    const sendComment = () => {
        const trackId = props.currentTrack.id;
        const currentUser = firebase.auth().currentUser;
        const creator = currentUser.displayName;

        axios.post('/sendComment', { creator, text, trackId }).then(res => {
            update();
            setText('');
        });
    }

    return (
        <Container>
            <Box className={classes.header}>
                <Box className={classes.backBtn}>
                    <IconButton onClick={props.history.goBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                
                <Typography variant="h5">
                    {props.currentTrack.name}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">
                    Comments
                </Typography>
                <Box className={classes.footer}>
                    <TextField
                        label="Коммент"
                        id="outlined-margin-none"
                        value={text}
                        fullWidth
                        onChange={e => setText(e.target.value)}
                        variant="outlined" />
                    <IconButton style={{ margin: '0 5px'}} onClick={sendComment}>
                        <SendIcon />
                    </IconButton>
                </Box>
                {
                    allComments && allComments.map(item => {
                        return (
                            <Comment key={item.id} text={item.text} creator={item.creator}/>
                        );
                    })
                }
            </Box>
            
        </Container>
    );
};

const mapStateToProps = state => ({currentTrack: state.currentTrack});

export const Comments = connect(mapStateToProps)(CommentsComponent);