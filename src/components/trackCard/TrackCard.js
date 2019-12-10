import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Avatar, Button } from '@material-ui/core';
import { setCurrentTrack } from '../../store/actions/trackActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    card: {
        width: 250,
        margin: 20,
        height: 300,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    media: {
        height: 180,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        marginTop: 5
    },
    text: {
        fontSize: 15,
        marginTop: 5
    }
});

function TrackCardComponent(props) {
    const classes = useStyles();
    const date = props.createdAt;
    const updatedDate = props.updatedAt;

    const getDate = dateStamp => {
        const date = new Date(dateStamp);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} / ${date.getHours()}:${date.getMinutes()} `
    }

    const getCreator = creator => {
        const strs = creator.split(' ');
        return `${strs[0][0]}${strs[1][0]}`;
    }

    const goToDetails = () => {
        props.setCurrentTrack(props.id);
        props.history.push(`/track/${props.id}`);
    }

    return (
        <Paper className={classes.card}>
            <Container>
                <div className={classes.header}>
                    <Typography variant="h6">
                        {props.name}
                    </Typography>
                    <Avatar>{getCreator(props.creator)}</Avatar>
                </div>
                <Typography className={classes.text}>
                    Создан: {getDate(date)}
                </Typography>
                <Typography className={classes.text}>
                    Обновлён: {getDate(updatedDate)}
                </Typography>
            </Container>
            <Container>
                <Typography>
                    Demos: {props.demos.length}
                </Typography>
                <Typography>
                    GTP: {props.gtp.length}
                </Typography>
                <Typography>
                    Comments: {props.comments.length}
                </Typography>
                <Typography>
                    Media: {props.media.length}
                </Typography>
                <Button
                    onClick={goToDetails}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.btn}>Подробнее...</Button>
            </Container>
        </Paper>
    );
}

const mapDispatchToProps = ({
    setCurrentTrack
});

export const TrackCard = connect(null, mapDispatchToProps)(TrackCardComponent);