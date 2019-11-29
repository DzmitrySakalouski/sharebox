import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        width: 250,
        margin: 20,
        height: 250,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    media: {
        height: 140,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        marginTop: 5
    }
});

export function TrackCard(props) {
    const classes = useStyles();
    const date = props.createdAt.toDate();

    const getDate = dateStamp => {
        const date = new Date(dateStamp);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    const getCreator = creator => {
        const strs = creator.split(' ');
        return `${strs[0][0]}${strs[1][0]}`;
    }

    const goToDetails = () => {
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
                <Typography>
                    Создан: {getDate(date)}
                </Typography>
                <Typography>
                    Обновлён: {getDate(date)}
                </Typography>
            </Container>
            <Container>
                <Typography>
                    Demos: {props.demos.length}
                </Typography>
                <Typography>
                    GTP: {props.gtp.length}
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