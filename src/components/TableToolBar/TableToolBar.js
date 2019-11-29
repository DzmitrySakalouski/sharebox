import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxHeight: 50
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const TableToolBar = (props) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = event => {
        setAge(event.target.value);
    };
    const handleDeleteColumn = () => {
        props.removeColumn(age);
    }
    return (
        <Container maxWidth="lg" fixed>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleDeleteColumn}>
                Delete Selected column
            </Button>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                >
                    {
                        props.columns.map(item => {
                            return (
                                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Container >
    )
}