import React from 'react';
import Dropzone from 'react-dropzone';

export class DropzoneComponent extends React.Component {
    onDrop = files => {
        console.log(files);
    }

    render() {
        return (
            <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} style={{ width: 150, height: 150, border: "1px solid black" }}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}