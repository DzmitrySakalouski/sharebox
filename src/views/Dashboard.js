import React from 'react';
import { DropzoneComponent } from '../components/dropzone/Dropzone';
import db from '../services/db';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    db.find({}, function (err, docs) {
      console.log(docs);
    });
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