import React from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: { width: 450, height: 350, border: "1px solid black" }
});

export function DropzoneComponent(props) {
    const classes = useStyles();
    const onDrop = files => {
        console.log(files);
    }

    return (
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className={classes.container}>
                        <input {...getInputProps()} />
                        <Typography>
                            Перетяни файл сюда
                        </Typography>
                    </div>
                </section>
            )}
        </Dropzone>
    );
}