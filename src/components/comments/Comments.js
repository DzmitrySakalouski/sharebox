import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import firebase from 'firebase';
import { Comment } from '../comment/comment';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';

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
    const [track, setTrack] = useState(null);
    const [comment, setComment] = useState('');
    const id = props.match.params.id;
    const db = firebase.firestore();    

    const classes = useStyles();

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        const documentRef = db.collection("tracks").doc(id);
        documentRef.get().then(doc => {
            if (doc.exists) {
                setTrack({ ...doc.data(), id });
            }
        })
    }
console.log('CommentsComponent', props)
    const sendComment = () => {
        const currentComments = track.comments;
        const documentRef = db.collection("tracks").doc(id);
        const currentUser = firebase.auth().currentUser;
        const creator = currentUser.displayName;
        
        documentRef.update({
            updatedAt: new Date(),
            comments: [...currentComments, {
                creator,
                text: comment
            }]
        }).then(res => {
            update();
            setComment('');
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
                    {track && track.name}
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
                        defaultValue={comment}
                        fullWidth
                        onChange={e => setComment(e.target.value)}
                        variant="outlined" />
                    <IconButton style={{ margin: '0 5px'}} onClick={sendComment}>
                        <SendIcon />
                    </IconButton>
                </Box>
                {
                    props.comments.reverse().map(item => {
                        return (
                            <Comment key={item.text + item.creator} text={item.text} creator={item.creator}/>
                        );
                    })
                }
            </Box>
            
        </Container>
    );
};

const mapStateToProps = state => ({comments: state.currentTrack.comments});

export const Comments = connect(mapStateToProps)(CommentsComponent);