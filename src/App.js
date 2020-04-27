
import React from 'react';
import PlotData from './PlotData';
const parse = require('csv-parse/lib/sync');

// todo: Make number 9 parameter (amount of lines to ignore)

export default class extends React.Component {

  state = {
    data: null
  }

  handleFile(file) {
    const fileReader = new FileReader();
    fileReader.onloadend = e => {
      const fileString = fileReader.result;
      const splitted = fileString.split('\n');
      splitted.splice(0,9);
      splitted[0] = splitted[0].trim().slice(0,-1); // remove last character, a comma
      const s = splitted.join('\n');
      console.log(s)
      const parsed = parse(s, {
        columns: true,
        skip_empty_lines: true
      });
      this.setState({data: parsed});
    };
    fileReader.readAsText(file);
  }

  render() {
      return (
        <div style={{padding: 20}}>
          <h1>WRLog plot utility</h1>
          <p>A simple utitlity to plot data from WRLog</p>
          <input 
            type="file" 
            id="file" 
            ref="fileUploader" 
            style={{display: "none"}}
            onChange={e => this.handleFile(e.target.files[0])}
            />
          <button onClick={() => {
            this.refs.fileUploader.click()
          }}>Select health file</button>
          <br />
          <br />
          {this.state.data ? <PlotData data={this.state.data} /> : null}

        </div>
    )
  }

}  