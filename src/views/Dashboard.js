import React from 'react';
import { DropzoneComponent } from '../components/dropzone/Dropzone';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <DropzoneComponent />
      </div>
    );
  }

}