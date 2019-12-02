import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DropzoneComponent } from '../dropzone/Dropzone';
import { Box } from '@material-ui/core';
import { TrackEditForm } from '../trackEditForm/TrackEditForm';

const types = [
    {
        label: "Demo",
        id: "demos"
    },
    {
        label: "GTP tab",
        id: 'gtp'
    }
];

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

export function NewTrackItem(props) {
    const classes = useStyles();
    const [selectedType, setSelectedType] = useState('');

    const handleChange = e => {
        setSelectedType(e.target.value);
    }

    return (
        <Box>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedType}
                onChange={handleChange}
            >
                {/* <MenuItem value={10}>Ten</MenuItem> */}
                {
                    types.map(item => {
                        return (<MenuItem value={item.id} key={item.id}>{item.label}</MenuItem>)
                    })
                }
            </Select>
      </FormControl>
      { selectedType && <TrackEditForm goBack={props.goBack} type={selectedType} track={props.track} /> }
      </Box>
    );
}